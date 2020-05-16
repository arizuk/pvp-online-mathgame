import React, { useState, useContext } from 'react'
import { AppContext } from 'containers/App'

function PlayerEdit() {
  const context = useContext(AppContext)
  const [playerId, setPlayerId] = useState(context.playerId)

  const save = () => {
    context.changePlayerId(playerId)
    context.changePage('home')
  }

  return (
    <div>
      <h1>Player Edit Page</h1>
      {context.playerId ? null : (
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
        <button onClick={() => context.changePage('home')}>Cancel</button>
      </div>
    </div>
  )
}

export default PlayerEdit
