import React, { useContext, useEffect } from "react"
import { useAppState } from "contexts"
import { Pages } from "consts"

function Top() {
  const [, setPage] = useAppState("page")
  const [playerId] = useAppState("playerId")

  useEffect(() => {})

  return (
    <div>
      playerId: {playerId}
      Top
      <button onClick={() => setPage(Pages.PlayerEdit)}>
        Go To PlayerEdit
      </button>
    </div>
  )
}

export default Top
