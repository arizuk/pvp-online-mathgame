import React, { useState, useEffect } from "react"
import { useAppState } from "contexts"
import { Pages } from "consts"

function PlayerEdit() {
  const [, setPage] = useAppState("page")
  const [globalPlayerId, setGlobalPlayerId] = useAppState("playerId")

  const [playerId, setPlayerId] = useState(globalPlayerId)
  const [saveClicked, setSaveClicked] = useState(false)
  useEffect(() => {
    if (saveClicked) {
      setGlobalPlayerId(playerId)
      // Upload local storage
      setPage(Pages.Top)
    }
  }, [saveClicked])

  return (
    <div>
      PlayerEdit
      <input
        type="text"
        value={playerId}
        onChange={(ev) => setPlayerId(ev.target.value)}
      />
      <button onClick={() => setSaveClicked(true)}>Save</button>
      <button onClick={() => setPage(Pages.Top)}>Cancel</button>
    </div>
  )
}

export default PlayerEdit
