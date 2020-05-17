import React, { useContext, useEffect, useState } from 'react'
import { WSAPIClient } from 'api/client'
import { GameContext } from 'components/GameContainer'
import * as server_pb from 'mathgame/protobuf/server_pb'
import { Addition } from 'game/problem'

type GameAdditionProps = {
  client: WSAPIClient
  problem: Addition
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
  const [problem, setProblem] = useState<Addition | null>(null)

  useEffect(() => {
    const handler = (resp: server_pb.Response) => {
      console.log('response comes ' + resp.getType())

      switch (resp.getType()) {
        case server_pb.Response.Type.PROBLEM:
          const respProblem = resp.getProblem()
          if (respProblem) {
            const problem = Addition.from(respProblem)
            setProblem(problem)
          }
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
