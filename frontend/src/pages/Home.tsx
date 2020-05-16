import React, { useContext, useEffect } from 'react'
import { AppContext } from 'components/AppContainer'
import PageLink from 'components/PageLink'
import GameWindow from 'components/GameWindow'
import { GameContext, GameContainer } from 'components/GameContainer'
import { WSAPIContext } from 'components/WSAPIContainer'
import { Response } from 'mathgame/protobuf/server_pb'

const onNewPlayerJoined = (playerId: string, resp: Response) => {
  const newPlayerId = resp.getNewPlayerJoined()?.getPlayerId()
  if (playerId !== newPlayerId) {
    console.log(`${newPlayerId}さんが入室しました`)
  }
}

function Lobby() {
  const { playerId } = useContext(AppContext)
  const { wsReady, wsApiRef } = useContext(WSAPIContext)
  const gameCtx = useContext(GameContext)

  useEffect(() => {
    const client = wsApiRef?.current
    if (!client || !wsReady) return

    const handler = (resp: Response) => {
      switch (resp.getType()) {
        case Response.Type.NEW_PLAYER_JOINED:
          onNewPlayerJoined(playerId, resp)
          break
        case Response.Type.GAME_STARTED:
          gameCtx.setStarted(true)
          break
        default:
          break
      }
    }
    client.addResponseListener(handler)
    return () => {
      console.log('Lobby offResponse called')
      client.removeResponseListener(handler)
    }
  }, [wsApiRef, wsReady, playerId, gameCtx])

  // TODO: check current state
  const startGame = () => {
    if (wsReady) {
      gameCtx.setStarted(true)
      wsApiRef?.current?.startGame()
    }
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

function HomeInner() {
  const { wsApiRef } = useContext(WSAPIContext)
  const gameCtx = useContext(GameContext)
  const gameWindow = wsApiRef?.current ? (
    <GameWindow client={wsApiRef.current} />
  ) : null

  return (
    <div>
      {gameCtx.started ? null : <Lobby />}
      {gameWindow}
    </div>
  )
}

function Home() {
  return (
    <GameContainer>
      <HomeInner />
    </GameContainer>
  )
}

export default Home
