import React, { useContext, useEffect } from 'react'
import PlayerScoreList from '../components/PlayerScoreList'

import './GameResult.css'
import { GameContext } from 'components/GameContainer'
import { RouterContext } from 'components/Router'

export default function GameResult() {
  const { gameResult, resetGame } = useContext(GameContext)
  const { goToPage } = useContext(RouterContext)

  useEffect(() => resetGame(), [resetGame])
  if (!gameResult) return null
  return (
    <div>
      <h1 className="GameResult-title">ゲームしゅうりょう!</h1>

      <div className="GameResult-winner">
        <div className="winner">{gameResult.getWinner()}</div>
        <div>のかちだよ</div>
      </div>

      <PlayerScoreList playerScores={gameResult.getPlayerScoresList()} />

      <div>
        <button className="button" onClick={() => goToPage('home')}>
          もどる
        </button>
      </div>
    </div>
  )
}
