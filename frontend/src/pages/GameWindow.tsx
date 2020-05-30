import React, { useContext, useState, useEffect } from 'react'
import { GameContext } from 'components/GameContainer'
import * as server_pb from 'mathgame/protobuf/server_pb'
import {
  GameAddition,
  GameSubtraction,
  GameMultiplication,
} from 'components/Problems'
import { WSAPIContext } from 'components/WSAPIContainer'
import { FaRegThumbsUp } from 'react-icons/fa'
import PlayerScoreList from 'components/PlayerScoreList'

import './GameWindow.css'

// eslint-disable-next-line
const makeDummyProblem = () => {
  const prob = new server_pb.Problem()
  prob.setNumber(1)
  const binary = new server_pb.Binary()
  binary.setX(12)
  binary.setY(8)
  prob.setBinary(binary)
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

type NumberButtonProps = {
  onClick: () => void
  number: number
}
function NumberButton({ onClick, number }: NumberButtonProps) {
  return <button onClick={onClick}>{number}</button>
}

function AnswerResult({
  answerResult,
}: {
  answerResult: server_pb.AnswerResult | null
}) {
  let content = <div>とけるかな？</div>
  if (answerResult) {
    if (answerResult.getCorrect()) {
      content = (
        <div>
          <span className="playerName">{answerResult.getPlayerId()}</span>{' '}
          がせいかいしたよ <FaRegThumbsUp />
        </div>
      )
    } else {
      content = (
        <div>
          <span className="playerName">{answerResult.getPlayerId()}</span>{' '}
          がまちがえたよ
        </div>
      )
    }
  }

  return <div className="GameWindow-answerResult">{content}</div>
}

export default function GameWindow() {
  const { wsApiRef } = useContext(WSAPIContext)
  const { problem, answerResult } = useContext(GameContext)

  const client = wsApiRef?.current
  const [answer, setAnswer] = useState(0)
  const add = (value: number) => setAnswer(answer * 10 + value)
  const clear = () => setAnswer(0)
  const number = problem?.getNumber()

  const submit = () => {
    client?.answer(answer)
    clear()
  }

  useEffect(() => {
    clear()
  }, [number])

  if (!client) return null
  if (!problem) {
    return <div>ロード中です。ちょっとまってね</div>
  }

  const ProblemComponent =
    problem.getType() === server_pb.Problem.Type.ADDITION ? (
      <GameAddition problem={problem} />
    ) : problem.getType() === server_pb.Problem.Type.SUBTRACTION ? (
      <GameSubtraction problem={problem} />
    ) : (
      <GameMultiplication problem={problem} />
    )

  return (
    <div>
      <h1 className="GameWindow-title">Question {problem.getNumber()}</h1>
      <div>
        <AnswerResult answerResult={answerResult} />
      </div>

      <div className="GameWindow-problem">{ProblemComponent}</div>

      <div className="GameWindow-answer">
        <div>{answer}</div>
      </div>

      <div className="GameWindow-numberPad">
        <div className="row">
          {[0, 1, 2, 3].map((n) => (
            <NumberButton onClick={() => add(n)} number={n} />
          ))}
        </div>
        <div className="row">
          {[4, 5, 6, 7].map((n) => (
            <NumberButton onClick={() => add(n)} number={n} />
          ))}
        </div>
        <div className="row">
          {[8, 9].map((n) => (
            <NumberButton onClick={() => add(n)} number={n} />
          ))}
        </div>
      </div>

      <div className="GameWindow-control">
        <button onClick={clear}>クリア</button>
        <button className="submit" onClick={submit}>
          けってい
        </button>
      </div>

      <PlayerScoreList playerScores={answerResult?.getPlayerScoresList()} />
    </div>
  )
}
