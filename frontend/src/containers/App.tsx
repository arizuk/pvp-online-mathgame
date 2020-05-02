import React, { useState, useRef, useEffect } from 'react'
import { Message } from 'mathgame/protobuf/app_pb'
import { Join, Answer } from 'mathgame/protobuf/client_pb'
import { serializeMessage, getWsServerUrl } from 'helpers'
import { Pages } from 'consts'
import * as localStorageHelper from 'helpers/local_storage'

type State = {
  page: Pages
  playerId: string
}
type Actions = {
  changePage: (v: Pages) => void
  changePlayerId: (v: string) => void
}
type Store = State & Actions

export const AppContext = React.createContext<Store>({
  page: Pages.Home,
  playerId: '',
  changePage: (v) => {},
  changePlayerId: (v) => {},
})

type InitializationState = {
  sync: boolean
  ws: boolean
}
function useAppState() {
  const [page, setPage] = useState(Pages.Home)
  const [playerId, setPlayerId] = useState('')
  const state: State = { page, playerId }

  const [init, setInit] = useState<InitializationState>({
    sync: false,
    ws: false,
  })
  const [logs, setLogs] = useState<Array<string>>([])
  const socket = useRef<WebSocket>()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (init.sync === false) {
      localStorageHelper.sync<State>(state)
      setInit({ ...init, sync: true })
      return
    }

    // Redirect to playerEdit page
    if (!playerId) {
      setPage(Pages.PlayerEdit)
      return
    }

    if (init.ws === false) {
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

  return {
    ...state,
    changePage: localStorageHelper.wrap('page', setPage),
    changePlayerId: localStorageHelper.wrap('playerId', setPlayerId),
  }
}

export const AppContainer: React.FunctionComponent<{}> = (props) => {
  const store = useAppState()
  return (
    <AppContext.Provider value={store}>{props.children}</AppContext.Provider>
  )
}
