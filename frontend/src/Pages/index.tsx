import React, { useState, useContext } from "react"
import { PageContext, Pages } from "contexts/page"
import { getRoute } from "./routes"

function Page() {
  const { page } = useContext(PageContext)
  const PageComponent = getRoute(page)
  return <PageComponent></PageComponent>
}

export function PageRouter() {
  const [page, setPage] = useState(Pages.Top)

  const context = {
    page: page,
    changePage: (page: Pages) => setPage(page),
  }
  return (
    <PageContext.Provider value={context}>
      <Page></Page>
      {/* <header className="App-header"> */}
      {/* <img src={logo} className="App-logo" alt="logo" />
        <p>Counter {count}</p>
        <button onClick={() => setCount(count + 1)}>click me</button> */}
      {/* </header> */}
    </PageContext.Provider>
  )
}
