import React from "react"
import { useAppState } from "contexts"
import { Pages } from "consts"
import { PageLink } from "Components"

function Top() {
  const [playerId] = useAppState("playerId")

  return (
    <div>
      <h1>Top Page</h1>
      <div>
        なまえ: <PageLink to={Pages.PlayerEdit}>{playerId}</PageLink>
      </div>
      <div>
        <button>ゲームスタート</button>
      </div>
    </div>
  )
}

export default Top
