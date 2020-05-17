import React, { useContext, useEffect, useState } from 'react'
import { WSAPIClient } from 'api/client'
import { GameContext } from 'components/GameContainer'
import * as server_pb from 'mathgame/protobuf/server_pb'
import { Addition } from 'game/problem'
import GameAddition from './GameAddition'

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

  // FIXME: debug
  return (
    <GameAddition client={client} problem={new Addition(10, 20)}></GameAddition>
  )

  // if (!started) {
  //   return <></>
  // }
  // if (problem) {
  //   return <GameAddition client={client} problem={problem} />
  // }
  // return <div>Server response waiting..</div>
}
