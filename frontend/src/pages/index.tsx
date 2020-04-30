import React from 'react'
import { getRoute } from './routes'
import { useAppState } from 'contexts'

// {/* <header className="App-header"> */}
// {/* <img src={logo} className="App-logo" alt="logo" />
//   <p>Counter {count}</p>
//   <button onClick={() => setCount(count + 1)}>click me</button> */}
// {/* </header> */}

export function PageRouter() {
  const [page] = useAppState('page')
  const PageComponent = getRoute(page)
  return <PageComponent></PageComponent>
}
