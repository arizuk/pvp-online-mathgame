import React, { useState, useEffect } from 'react'
import { useAppState } from 'contexts'
import { Pages } from 'consts'

function PlayerEdit() {
  const [, setPage] = useAppState('page')
  const [globalPlayerId, setGlobalPlayerId] = useAppState('playerId')

  const [playerId, setPlayerId] = useState(globalPlayerId)
  const [saveClicked, setSaveClicked] = useState(false)

  useEffect(() => {
    if (saveClicked) {
      setGlobalPlayerId(playerId)
      setPage(Pages.Top)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveClicked])

  return (
    <div>
      <h1>Player Edit Page</h1>
      {globalPlayerId ? null : (
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
        <button onClick={() => setPage(Pages.Top)}>Cancel</button>
      </div>
    </div>
  )
}

export default PlayerEdit
