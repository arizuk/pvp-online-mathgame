import React from 'react'
import * as server_pb from 'mathgame/protobuf/server_pb'

import './PlayerScoreList.css'

type Props = {
  playerScores: Array<server_pb.PlayerScore> | undefined
}
export default function PlayerScoreList({ playerScores }: Props) {
  if (!playerScores) return null

  const players = playerScores.map((p) => {
    return (
      <div key={p.getPlayerId()} className="player">
        <span className="name">{p.getPlayerId()}</span>
        <span>{p.getScore()}pt</span>
      </div>
    )
  })
  return <div className="PlayerScoreList">{players}</div>
}
