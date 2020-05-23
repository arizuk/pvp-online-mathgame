import React from 'react'
import * as server_pb from 'mathgame/protobuf/server_pb'
import PlayerScoreList from './PlayerScoreList'

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

      <PlayerScoreList playerScores={gameResult.getPlayerScoresList()} />

      <div>
        {/* FIXME */}
        <button className="button" onClick={() => window.location.reload()}>
          もどる
        </button>
      </div>
    </div>
  )
}
