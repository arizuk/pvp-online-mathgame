import React, { useContext, useEffect } from 'react'
import * as server_pb from 'mathgame/protobuf/server_pb'
import PlayerScoreList from '../components/PlayerScoreList'

import './GameResult.css'
import { GameContext } from 'components/GameContainer'
import { RouterContext } from 'components/Router'

export default function GameResult() {
  const { gameResult } = useContext(GameContext)
  const { goToPage } = useContext(RouterContext)
  useEffect(() => {
    if (!gameResult) goToPage('home')
  }, [gameResult])

  if (!gameResult) {
    return null
  }
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
