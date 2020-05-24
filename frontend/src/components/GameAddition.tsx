import React, { useState, useEffect } from 'react'
import { WSAPIClient } from 'api/client'
import * as server_pb from 'mathgame/protobuf/server_pb'
import { FaRegThumbsUp } from 'react-icons/fa'

import './GameAddition.css'
import PlayerScoreList from './PlayerScoreList'

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

  return <div className="GameAddition-answerResult">{content}</div>
}

type Props = {
  client: WSAPIClient
  problem: server_pb.Problem
  answerResult: server_pb.AnswerResult | null
}
export default function GameAddition({ client, problem, answerResult }: Props) {
  const number = problem.getNumber()
  const addition = problem.getAddition()
  if (!addition) throw new Error()

  const [answer, setAnswer] = useState(0)
  const add = (value: number) => setAnswer(answer * 10 + value)
  const clear = () => setAnswer(0)

  const submit = () => {
    client.answer(answer)
    clear()
  }

  useEffect(() => {
    clear()
  }, [number])

  return (
    <div>
      <h1 className="GameAddition-title">Question {number}</h1>
      <div>
        <AnswerResult answerResult={answerResult} />
      </div>

      <div className="GameAddition-problem">
        {addition.getX()} + {addition.getY()} = ?
      </div>

      <div className="GameAddition-answer">
        <div>{answer}</div>
      </div>

      <div className="GameAddition-numberPad">
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

      <div className="GameAddition-control">
        <button onClick={clear}>クリア</button>
        <button className="submit" onClick={submit}>
          けってい
        </button>
      </div>

      <PlayerScoreList playerScores={answerResult?.getPlayerScoresList()} />
    </div>
  )
}
