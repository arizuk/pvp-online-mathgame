import React, { useContext, useEffect, useState } from 'react'
import { WSAPIClient } from 'api/client'
import { GameContext } from 'components/GameContainer'
import * as server_pb from 'mathgame/protobuf/server_pb'
import GameAddition from './GameAddition'

type GameWindowProps = {
  client: WSAPIClient
}
export default function GameWindow({ client }: GameWindowProps) {
  const { started } = useContext(GameContext)
  const [problem, setProblem] = useState<server_pb.Problem | null>(null)
  const [
    answerResult,
    setAnswerResult,
  ] = useState<server_pb.AnswerResult | null>(null)
  const [gameResult, setGameResult] = useState<server_pb.GameResult | null>(
    null
  )

  useEffect(() => {
    const handler = (resp: server_pb.Response) => {
      switch (resp.getType()) {
        case server_pb.Response.Type.PROBLEM:
          const respProblem = resp.getProblem()
          if (respProblem) setProblem(respProblem)
          break
        case server_pb.Response.Type.ANSWER_RESULT:
          const respAnswerResult = resp.getAnswerResult()
          if (respAnswerResult) setAnswerResult(respAnswerResult)
          break
        case server_pb.Response.Type.GAME_RESULT:
          const respGameResult = resp.getGameResult()
          if (respGameResult) setGameResult(respGameResult)
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

  // // FIXME: debug
  // return (
  //   <GameAddition client={client} problem={new Addition(10, 20)}></GameAddition>
  // )

  if (!started) {
    return <></>
  }
  if (gameResult) {
    return <div>Game終了! winner: {gameResult.getWinner()}</div>
  } else if (problem) {
    return (
      <GameAddition
        client={client}
        problem={problem}
        answerResult={answerResult}
      />
    )
  }
  return <div>Server response waiting..</div>
}
