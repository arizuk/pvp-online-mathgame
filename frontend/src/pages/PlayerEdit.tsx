import React, { useState, useContext } from 'react'
import { AppContext } from 'components/AppContainer'
import { RouterContext } from 'components/Router'

function PlayerEdit() {
  const appContext = useContext(AppContext)
  const { goToPage } = useContext(RouterContext)

  const [playerId, setPlayerId] = useState(appContext.playerId)

  const save = () => {
    appContext.changePlayerId(playerId)
    goToPage('home')
  }

  return (
    <div className="playerEdit">
      <h1 className="title small">みんなで!さんすう!</h1>
      <div className="guide">
        ゲームをはじめるには
        <br />
        なまえを入力してください
      </div>
      <div>
        <input
          className="form"
          type="text"
          value={playerId}
          onChange={(ev) => setPlayerId(ev.target.value)}
        />
      </div>
      <div className="control">
        <button className="button" onClick={save}>
          へんこうする
        </button>
        <button className="button gray" onClick={() => goToPage('home')}>
          もどる
        </button>
      </div>
    </div>
  )
}

export default PlayerEdit
