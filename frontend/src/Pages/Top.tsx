import React, { useContext, useEffect } from "react"
import { Pages, PageContext } from "contexts/page"

function Top() {
  const { changePage } = useContext(PageContext)

  useEffect(() => {})

  return (
    <div>
      Top
      <button onClick={() => changePage(Pages.PlayerEdit)}>
        Go To PlayerEdit
      </button>
    </div>
  )
}

export default Top
