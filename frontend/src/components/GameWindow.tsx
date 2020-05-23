import React, { useContext, useEffect, useState } from 'react'
import { WSAPIClient } from 'api/client'
import { GameContext } from 'components/GameContainer'
import * as server_pb from 'mathgame/protobuf/server_pb'
import GameAddition from './GameAddition'
import GameResult from './GameResult'

// eslint-disable-next-line
const makeDummyProblem = () => {
  const prob = new server_pb.Problem()
  prob.setNumber(1)
  const addition = new server_pb.Addition()
  addition.setX(12)
  addition.setY(8)
  prob.setAddition(addition)
  return prob
}

// eslint-disable-next-line
const makeDummyGameResult = () => {
  const gameResult = new server_pb.GameResult()
  gameResult.setWinner('taro')
  const names = ['たろう', 'はなこ']
  names.forEach((name: string, i: number) => {
    const score = new server_pb.PlayerScore()
    score.setPlayerId(name)
    score.setScore((i+1) * 2)
    gameResult.addPlayerScores(score)
  })
  return gameResult
}

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

  if (!started) {
    return <></>
  }

  if (gameResult) {
    return <GameResult gameResult={gameResult} />
  } else if (problem) {
    return (
      <GameAddition
        client={client}
        problem={problem}
        answerResult={answerResult}
      />
    )
  }
  return <div>ロード中です。ちょっとまってね</div>
}
