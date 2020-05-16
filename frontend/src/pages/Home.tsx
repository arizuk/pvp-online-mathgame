import React, { useContext } from 'react'
import { AppContext } from 'components/AppContainer'
import PageLink from 'components/PageLink'

function Home() {
  const { playerId } = useContext(AppContext)

  const dispatch = (payload: any) => {
    alert(payload)
  }

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        なまえ: <PageLink to="playerEdit">{playerId}</PageLink>
      </div>
      <div>
        <button onClick={() => dispatch({ type: 'start_game' })}>
          ゲームスタート
        </button>
      </div>
      <div>
        <button onClick={() => dispatch({ type: 'answer', value: 'FIXME' })}>
          answer
        </button>
      </div>
    </div>
  )
}

export default Home
