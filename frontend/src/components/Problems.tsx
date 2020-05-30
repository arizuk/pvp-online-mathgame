import React from 'react'
import * as server_pb from 'mathgame/protobuf/server_pb'

type Props = {
  problem: server_pb.Problem
}
export function GameAddition({ problem }: Props) {
  const addition = problem.getAddition()
  if (!addition) throw new Error()
  return (
    <div>
      {addition.getX()} + {addition.getY()} = ?
    </div>
  )
}
