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
    <div>
      <h1>Player Edit Page</h1>
      {appContext.playerId ? null : (
        <div>ゲームをはじめるにはまず、なまえを入力してください</div>
      )}

      <div>
        <input
          type="text"
          value={playerId}
          onChange={(ev) => setPlayerId(ev.target.value)}
        />
      </div>
      <div>
        <button onClick={save}>Save</button>
        <button onClick={() => goToPage('home')}>Cancel</button>
      </div>
    </div>
  )
}

export default PlayerEdit
