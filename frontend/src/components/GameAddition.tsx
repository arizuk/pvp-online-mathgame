import React, { useContext, useEffect, useState } from 'react'
import { WSAPIClient } from 'api/client'
import { Addition } from 'game/problem'

type Props = {
  client: WSAPIClient
  problem: Addition
  number: number
}
export default function GameAddition({ client, problem, number }: Props) {
  const [answer, setAnswer] = useState(0)

  const add = (value: number) => setAnswer(answer * 10 + value)
  const clear = () => setAnswer(0)

  const submit = () => {
    client.answer(answer)
    clear()
  }
  return (
    <div>
      <div>
        <p>
          Q{number}. {problem.x} + {problem.y} = ?
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
    </div>
  )
}
