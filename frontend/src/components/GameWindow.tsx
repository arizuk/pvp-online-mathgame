import React, { useContext, useEffect, useState } from 'react'
import { WSAPIClient } from 'api/client'
import { GameContext } from 'components/GameContainer'
import { Response } from 'mathgame/protobuf/server_pb'

type GameAdditionProps = {
  client: WSAPIClient
  problem: { x: number; y: number }
}
function GameAddition({ client, problem }: GameAdditionProps) {
  const answer = () => {
    client.answer('hoge')
  }

  return (
    <div>
      <div>
        Q. {problem.x} + {problem.y} = ?
      </div>
      <div onClick={answer}>こたえる</div>
    </div>
  )
}

type GameWindowProps = {
  client: WSAPIClient
}
export default function GameWindow({ client }: GameWindowProps) {
  const { started } = useContext(GameContext)
  const [problem, setProblem] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const handler = (resp: Response) => {
      console.log('response comes ' + resp.getType())

      switch (resp.getType()) {
        case Response.Type.PROBLEM:
          const addition = resp.getProblem()!.getAddition()
          setProblem({ x: addition!.getX(), y: addition!.getY() })
          break
        default:
          break
      }
    }
    client.addResponseListener(handler)
    return () => {
      console.log('GameWindow offResponse called')
      client.removeResponseListener(handler)
    }
  }, [client])

  if (!started) {
    return <></>
  }
  if (problem) {
    return <GameAddition client={client} problem={problem} />
  }
  return <div>Server response waiting..</div>
}
