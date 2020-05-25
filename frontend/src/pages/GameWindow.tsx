import React, { useContext } from 'react'
import { GameContext } from 'components/GameContainer'
import * as server_pb from 'mathgame/protobuf/server_pb'
import GameAddition from 'components/GameAddition'
import { WSAPIContext } from 'components/WSAPIContainer'

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

// TODO: どこかにうつす
// eslint-disable-next-line
const makeDummyGameResult = () => {
  const gameResult = new server_pb.GameResult()
  gameResult.setWinner('taro')
  const names = ['たろう', 'はなこ']
  names.forEach((name: string, i: number) => {
    const score = new server_pb.PlayerScore()
    score.setPlayerId(name)
    score.setScore((i + 1) * 2)
    gameResult.addPlayerScores(score)
  })
  return gameResult
}

export default function GameWindow() {
  const { wsApiRef } = useContext(WSAPIContext)
  const { started, problem, answerResult } = useContext(GameContext)

  if (!started) {
    return null
  }
  const client = wsApiRef?.current
  if (!client) {
    return null
  }

  if (problem) {
    return (
      <GameAddition
        client={client}
        problem={problem}
        answerResult={answerResult}
      />
    )
  } else {
    return <div>ロード中です。ちょっとまってね</div>
  }
}
