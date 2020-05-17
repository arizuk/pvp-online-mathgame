import React, { useState } from 'react'
import { WSAPIClient } from 'api/client'
import * as server_pb from 'mathgame/protobuf/server_pb'

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

  let answerResultView = null
  if (answerResult) {
    answerResultView = (
      <div>
        {answerResult.getPlayerId()} answered:
        {String(answerResult.getCorrect())}
      </div>
    )
  }

  return (
    <div>
      <div>
        <p>
          Q{number}. {addition.getX()} + {addition.getY()} = ?
        </p>
      </div>
      <div>
        <p>{answer}</p>
      </div>
      <div>
        <div>
          <button onClick={() => add(0)}>0</button>
          <button onClick={() => add(1)}>1</button>
          <button onClick={() => add(2)}>2</button>
          <button onClick={() => add(3)}>3</button>
          <button onClick={() => add(4)}>4</button>
        </div>
        <div>
          <button onClick={() => add(5)}>5</button>
          <button onClick={() => add(6)}>6</button>
          <button onClick={() => add(7)}>7</button>
          <button onClick={() => add(8)}>8</button>
          <button onClick={() => add(9)}>9</button>
        </div>
      </div>
      <div>
        <button onClick={clear}>clear</button>
        <button onClick={submit}>answer</button>
      </div>

      <div>{answerResultView}</div>
    </div>
  )
}
