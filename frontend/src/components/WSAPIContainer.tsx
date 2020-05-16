import React, { useRef, useContext, useEffect, useState } from 'react'
import { WSAPIClient } from 'api/client'
import { AppContext } from './AppContainer'
import { getWsServerUrl } from 'helpers'

type Context = {
  wsApiRef: React.MutableRefObject<WSAPIClient | undefined> | null
  wsReady: boolean
}
export const WSAPIContext = React.createContext<Context>({
  wsApiRef: null,
  wsReady: false,
})

export const WSAPIContainer: React.FunctionComponent<{}> = ({ children }) => {
  const { playerId } = useContext(AppContext)
  const wsApiRef = useRef<WSAPIClient>()

  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!playerId) return

    // TODO: reconnect
    if (initialized) return

    const client = new WSAPIClient(getWsServerUrl(window), playerId)
    wsApiRef.current = client
    setInitialized(true)

    client.socket.addEventListener('message', (ev) => {
      console.log(`[ONMESSAGE] ${ev.data}`)
    })
    client.socket.addEventListener('open', (ev) => {
      console.log('ON OPEN')
      client.joinRoom()
    })
    client.socket.addEventListener('close', (ev) => {
      console.log('connection closed')
    })
    client.socket.addEventListener('error', (ev) => {
      console.log('connection error')
    })
  }, [playerId, initialized])

  const store = { wsApiRef, wsReady: initialized }
  return <WSAPIContext.Provider value={store}>{children}</WSAPIContext.Provider>
}
