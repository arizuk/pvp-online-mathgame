import React from 'react'
import { getCurrentPage } from './routes'
import { useAppState } from 'contexts'
import { Pages } from 'consts'

// {/* <header className="App-header"> */}
// {/* <img src={logo} className="App-logo" alt="logo" />
//   <p>Counter {count}</p>
//   <button onClick={() => setCount(count + 1)}>click me</button> */}
// {/* </header> */}

export function PageRoot() {
  const [page, setPage] = useAppState('page')
  const PageComponent = getCurrentPage(page)

  // In case where a obsolete page is cached in the local storage
  if (!PageComponent) {
    setPage(Pages.Home)
    return null
  }

  return <PageComponent></PageComponent>
}
