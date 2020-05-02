import React, { useContext } from 'react'
import { Pages } from 'consts'
import { PageLink } from 'components'
import { AppContext } from 'containers/App'

function Home() {
  const { playerId } = useContext(AppContext)

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        なまえ: <PageLink to={Pages.PlayerEdit}>{playerId}</PageLink>
      </div>
      <div>
        <button>ゲームスタート</button>
      </div>
    </div>
  )
}

export default Home
