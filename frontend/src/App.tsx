import React, {useEffect, useState} from 'react'
import logo from './logo.svg'
import './App.css'

import { Message } from "mathgame/protobuf/app_pb"
import { Join, Answer } from "mathgame/protobuf/client_pb"
import { serializeMessage } from "helpers"

let ws: WebSocket|null = null

const getWSUrl = () => {
  const devPort = '3000'
  const protocolPrefix =
    window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  let { host, port } = window.location

  if (port === devPort) {
    host = host.replace(devPort, '8000')
  }
  const wsUrl = `${protocolPrefix}//${host}/ws`
  return wsUrl
}

function App() {
  const [wsIsReady, setWsIsReady] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (ws) return

    ws = new WebSocket(getWSUrl())

    ws.addEventListener('message', (ev) => {
      console.log(ev.data)

    })
    ws.addEventListener('open', (ev) => {
      if (ws) {
        const join = new Join()
        join.setPlayerId("taro")
        ws.send(serializeMessage(Message.Type.CLIENT_ANSWER, join))
      }
      setWsIsReady(true)
    })
  }, [wsIsReady])

  useEffect(() => {
    if (!wsIsReady || !ws) return
    const answer = new Answer()
    answer.setPlayerId("taro")
    ws.send(serializeMessage(Message.Type.CLIENT_ANSWER, answer))
  }, [wsIsReady, count])

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