import React, { useContext } from 'react'
import { AppContext } from 'components/AppContainer'
import PageLink from 'components/PageLink'
import GameWindow from 'components/GameWindow'
import { GameContext, GameContainer } from 'components/GameContainer'
import { WSAPIContext } from 'components/WSAPIContainer'

function Lobby() {
  const { playerId } = useContext(AppContext)
  const { wsReady, wsApiRef } = useContext(WSAPIContext)
  const gameCtx = useContext(GameContext)

  // TODO: check current state
  const startGame = () => {
    if (wsReady) gameCtx.setStarted(true)
  }

  if (gameCtx.started && wsApiRef?.current) {
    return <GameWindow client={wsApiRef.current} />
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

      <div>wsReady: {String(wsReady)}</div>
    </div>
  )
}

function Home() {
  return (
    <GameContainer>
      <Lobby />
    </GameContainer>
  )
}

export default Home
