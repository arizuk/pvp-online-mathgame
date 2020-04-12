import React, {useEffect, useState} from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  useEffect(() => {
    const devPort = '3000'
    const protocolPrefix =
      window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    let { host, port } = window.location

    if (port === devPort) {
      host = host.replace(devPort, '8000')
    }
    const wsUrl = `${protocolPrefix}//${host}/ws`
    const ws = new WebSocket(wsUrl)
    ws.addEventListener('message', (ev) => {
      console.log(ev.data)
    })
    ws.addEventListener('open', (ev) => {
      console.log('WS onOpen')
      ws.send(
        JSON.stringify({
          type: 'JOIN',
          payload: {},
        })
      )
    })
  })

  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Counter {count}</p>
        <button onClick={() => setCount(count+1)}>click me</button>
      </header>
    </div>
  )
}

export default App