import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'components/AppContainer'
import PageLink from 'components/PageLink'
import GameWindow from 'components/GameWindow'
import { GameContext, GameContainer } from 'components/GameContainer'
import { WSAPIContext } from 'components/WSAPIContainer'
import * as server_pb from 'mathgame/protobuf/server_pb'
import { FaRegThumbsUp } from 'react-icons/fa'

function Lobby() {
  const { playerId } = useContext(AppContext)
  const { wsReady, wsApiRef } = useContext(WSAPIContext)
  const gameCtx = useContext(GameContext)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const client = wsApiRef?.current
    if (!client || !wsReady) return

    const handler = (resp: server_pb.Response) => {
      switch (resp.getType()) {
        case server_pb.Response.Type.NEW_PLAYER_JOINED:
          const newPlayerId = resp.getNewPlayerJoined()?.getPlayerId()
          if (playerId !== newPlayerId) {
            const message = `${newPlayerId}さんが入室しました`
            setNotification(message)
          }
          break
        case server_pb.Response.Type.GAME_STARTED:
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
      <h1 className="title">みんなで!さんすう!</h1>
      <div className="content">
        {notification ? (
          <div className="notification">
            <div className="item">
              {notification}
              &nbsp;
              <FaRegThumbsUp />
            </div>
          </div>
        ) : null}
        <div className="playerInfo">
          <div className="item label">なまえ</div>
          <div className="item name">
            <PageLink to="playerEdit">{playerId}</PageLink>
          </div>
        </div>
        <div>
          <button className="button" onClick={() => startGame()}>
            ゲームスタート
          </button>
        </div>
      </div>
      <div className="footer">
        <div>wsReady: {String(wsReady)}</div>
      </div>
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
