import React, { useContext, useState } from 'react'
import { AppContext } from 'components/AppContainer'
import PageLink from 'components/PageLink'
import GameWindow from 'components/GameWindow'
import { WSAPIContext } from 'components/WSAPIContainer'

function Home() {
  const { playerId } = useContext(AppContext)
  const { wsReady, wsApiRef } = useContext(WSAPIContext)
  const [gameStarted, setGameStarted] = useState(false)

  const startGame = () => {
    if (wsReady) setGameStarted(true)
  }
  if (gameStarted && wsApiRef?.current) {
    return <GameWindow client={wsApiRef.current}></GameWindow>
  }

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        なまえ: <PageLink to="playerEdit">{playerId}</PageLink>
      </div>
      <div>
        <button onClick={() => startGame()}>ゲームスタート</button>
      </div>
    </div>
  )
}

export default Home
