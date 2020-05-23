import React, { useContext, useEffect, useState } from 'react'
import * as server_pb from 'mathgame/protobuf/server_pb'
import './GameResult.css'

export default function GameResult({
  gameResult,
}: {
  gameResult: server_pb.GameResult
}) {
  return (
    <div>
      <h1 className="GameResult-title">ゲームしゅうりょう!</h1>

      <div className="GameResult-winner">
        <div className="winner">{gameResult.getWinner()}</div>
        <div>のかちだよ</div>
      </div>

      <div className="GameResult-detais">
        <div>まさき: 0ぽいんと</div>
      </div>
    </div>
  )
}
