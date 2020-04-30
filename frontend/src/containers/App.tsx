import React, { useState, useRef, useEffect } from 'react'
import { Message } from 'mathgame/protobuf/app_pb'
import { Join, Answer } from 'mathgame/protobuf/client_pb'
import { serializeMessage, getWsServerUrl } from 'helpers'
import { Pages } from 'consts'
import { syncAppStateWithStorage, useAppState } from 'contexts'

export const AppContext = React.createContext({})

type InitializationState = {
  sync: boolean
  ws: boolean
}
function useInitializationState() {
  const [, setPage] = useAppState('page')
  const [playerId] = useAppState('playerId')
  const [init, setInit] = useState<InitializationState>({
    sync: false,
    ws: false,
  })
  const [logs, setLogs] = useState<Array<string>>([])
  const socket = useRef<WebSocket>()

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      console.log('ws initialized')

      socket.current = new WebSocket(getWsServerUrl())
      socket.current.addEventListener('message', (ev) => {
        setLogs(logs.concat(ev.data))
      })
      socket.current.addEventListener('open', (ev) => {
        if (socket.current) {
          const join = new Join()
          join.setPlayerId(playerId)
          socket.current.send(serializeMessage(Message.Type.CLIENT_JOIN, join))
        }
        setInit({ ...init, ws: true })
      })
    }
  })
}

export const AppContainer: React.FunctionComponent<{}> = (props) => {
  // TODO:
  //  * AppStateを更新するdispatchをstateにいれる
  useInitializationState()

  const state = {}
  return (
    <AppContext.Provider value={state}>{props.children}</AppContext.Provider>
  )
}
