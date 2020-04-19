import React, {useEffect, useState} from 'react'
import logo from './logo.svg'
import './App.css'

import { Message } from "mathgame/protobuf/app_pb"
import { Join } from "mathgame/protobuf/client_pb"

function App() {
  const join = new Join()
  join.setPlayerId("taro")
  const msg = new Message()
  msg.setType(Message.Type.CLIENT_JOIN)
  msg.setJoin(join)

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
      ws.send(msg.serializeBinary())
    })
  }, [])

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