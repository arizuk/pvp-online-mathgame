import React, { useContext, useState } from 'react'
import { AppContext } from 'components/AppContainer'
import PageLink from 'components/PageLink'
import GameWindow from 'components/GameWindow'
import { GameContext } from 'components/GameContainer'
import { WSAPIContext } from 'components/WSAPIContainer'
import { FaRegThumbsUp } from 'react-icons/fa'
import './Home.css'

function Lobby() {
  const { playerId } = useContext(AppContext)
  const { wsReady, wsApiRef } = useContext(WSAPIContext)
  const { setStarted, notification } = useContext(GameContext)
  const [numProblems, setNumProblems] = useState(5)

  // TODO: check current state
  const startGame = () => {
    if (wsReady) {
      setStarted(true)
      wsApiRef?.current?.startGame(numProblems)
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

        <div className="Home-gameStart">
          <div className="selectBoxWrap">
            <div className="selectBox">
              <select
                value={numProblems}
                onChange={(ev) => setNumProblems(parseInt(ev.target.value, 10))}
              >
                {[1, 3, 5, 10].map((num) => (
                  <option value={num}>{num}問</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <button className="button" onClick={() => startGame()}>
              ゲームスタート
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        <div>wsReady: {String(wsReady)}</div>
      </div>
    </div>
  )
}

function Home() {
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

export default Home
