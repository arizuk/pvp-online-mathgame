import React, { useState, useEffect, useContext } from 'react'
import { Pages } from 'consts'
import { AppContext } from 'containers/App'

function PlayerEdit() {
  const context = useContext(AppContext)

  const [playerId, setPlayerId] = useState(context.playerId)
  const [saveClicked, setSaveClicked] = useState(false)

  useEffect(() => {
    if (saveClicked) {
      context.changePlayerId(playerId)
      context.changePage(Pages.Home)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveClicked])

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
        <button onClick={() => setSaveClicked(true)}>Save</button>
        <button onClick={() => context.changePage(Pages.Home)}>Cancel</button>
      </div>
    </div>
  )
}

export default PlayerEdit
