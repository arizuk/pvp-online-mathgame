import React from 'react'
import * as server_pb from 'mathgame/protobuf/server_pb'

type GameAdditionProps = {
  problem: server_pb.Problem
}
export function GameAddition({ problem }: GameAdditionProps) {
  const binary = problem.getBinary()
  if (!binary) throw new Error()
  return (
    <div>
      {binary.getX()} + {binary.getY()} = ?
    </div>
  )
}

type GameSubtractionProps = {
  problem: server_pb.Problem
}
export function GameSubtraction({ problem }: GameSubtractionProps) {
  const binary = problem.getBinary()
  if (!binary) throw new Error()
  return (
    <div>
      {binary.getX()} - {binary.getY()} = ?
    </div>
  )
}

type GameMultiplicationProps = {
  problem: server_pb.Problem
}
export function GameMultiplication({ problem }: GameMultiplicationProps) {
  const binary = problem.getBinary()
  if (!binary) throw new Error()
  return (
    <div>
      {binary.getX()} × {binary.getY()} = ?
    </div>
  )
}
