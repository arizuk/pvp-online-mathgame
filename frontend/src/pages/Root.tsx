import React, { useContext } from 'react'
import { getCurrentPage } from './routes'
import { Pages } from 'consts'
import { AppContext } from 'containers/App'

// {/* <header className="App-header"> */}
// {/* <img src={logo} className="App-logo" alt="logo" />
//   <p>Counter {count}</p>
//   <button onClick={() => setCount(count + 1)}>click me</button> */}
// {/* </header> */}

export function PageRoot() {
  const { page, changePage } = useContext(AppContext)
  const PageComponent = getCurrentPage(page)

  // In case where a obsolete page is cached in the local storage
  if (!PageComponent) {
    changePage(Pages.Home)
    return null
  }

  return <PageComponent></PageComponent>
}
