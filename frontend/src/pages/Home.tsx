import React, { useContext } from 'react'
import { AppContext } from 'components/AppContainer'
import PageLink from 'components/PageLink'
import { WSAPIContext } from 'components/WSAPIContainer'

function Home() {
  const { playerId } = useContext(AppContext)
  const { wsApiRef } = useContext(WSAPIContext)

  const startGame = () => {
    wsApiRef?.current?.startGame()
  }

  const answer = () => {
    wsApiRef?.current?.answer('text')
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
      <div>
        <button onClick={() => answer()}>answer</button>
      </div>
    </div>
  )
}

export default Home
