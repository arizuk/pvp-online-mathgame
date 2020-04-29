import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import "./App.css"

import { Message } from "mathgame/protobuf/app_pb"
import { Join, Answer } from "mathgame/protobuf/client_pb"
import { serializeMessage } from "helpers"
import { PageRouter } from "Pages"
import { Pages } from "consts"
import { syncAppStateWithStorage, useAppState } from "contexts"
import { Stats } from "fs"

let ws: WebSocket | null = null

const getWSUrl = () => {
  const devPort = "3000"
  const protocolPrefix = window.location.protocol === "https:" ? "wss:" : "ws:"
  let { host, port } = window.location

  if (port === devPort) {
    host = host.replace(devPort, "8000")
  }
  const wsUrl = `${protocolPrefix}//${host}/ws`
  return wsUrl
}

interface InitializationState {
  sync: boolean
  ws: boolean
}

function useInitializationState() {
  const [_, setPage] = useAppState("page")
  const [playerId] = useAppState("playerId")

  const initState: InitializationState = { sync: false, ws: false }
  const [init, setInit] = useState(initState)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    if (init.sync === false) {
      syncAppStateWithStorage()
      setInit({ ...init, sync: true })
      return
    }

    // Redirect to playerEdit page
    if (!playerId) {
      setPage(Pages.PlayerEdit)
      return
    }

    if (init.ws === false) {
      console.log("ws initialized")

      ws = new WebSocket(getWSUrl())

      ws.addEventListener("message", (ev) => {
        setLogs(logs.concat(ev.data))
      })

      ws.addEventListener("open", (ev) => {
        if (ws) {
          const join = new Join()
          join.setPlayerId(playerId)
          ws.send(serializeMessage(Message.Type.CLIENT_JOIN, join))
        }
        setInit({ ...init, ws: true })
      })
    }
  }, [init, playerId])

  return [init, logs] as const
}

function App() {
  const [init, logs] = useInitializationState()

  // useEffect(() => {
  //   if (!wsIsReady || !ws) return
  //   const answer = new Answer()
  //   answer.setPlayerId("taro")
  //   ws.send(serializeMessage(Message.Type.CLIENT_ANSWER, answer))
  // }, [wsIsReady, count])

  return (
    <div className="App">
      {init.sync ? <PageRouter></PageRouter> : <div>NOW LOADING</div>}

      <div>
        <ul>
          <li>server:{getWSUrl()}</li>
        </ul>
      </div>

      <div>
        {logs.map((log, idx) => (
          <div key={idx}>{log}</div>
        ))}
      </div>
    </div>
  )
}

export default App
