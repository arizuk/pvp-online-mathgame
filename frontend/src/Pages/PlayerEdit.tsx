import React, { useContext } from "react"
import { Pages, PageContext } from "contexts/page"

function PlayerEdit() {
  console.log("PlayerEdit rendered")
  const { changePage } = useContext(PageContext)
  return (
    <div>
      PlayerEdit
      <button onClick={() => changePage(Pages.Top)}>Back to Top</button>
    </div>
  )
}

export default PlayerEdit
