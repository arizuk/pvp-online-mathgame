import React, { useRef, useContext, useEffect, useState } from 'react'
import { WSAPIClinet } from 'api/client'
import { AppContext } from './AppContainer'
import { getWsServerUrl } from 'helpers'

type Context = {
  clientRef: React.MutableRefObject<WSAPIClinet | undefined> | null
}
export const WSAPIContext = React.createContext<Context>({
  clientRef: null,
})
export const WSAPIContainer: React.FunctionComponent<{}> = ({ children }) => {
  const { playerId } = useContext(AppContext)
  const clientRef = useRef<WSAPIClinet>()

  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!playerId) return

    // TODO: reconnect
    if (initialized) return

    const client = new WSAPIClinet(getWsServerUrl(window), playerId)
    clientRef.current = client
    setInitialized(true)

    // apiClient.socket.addEventListener('message', (ev) => {
    //   console.log(`[ONMESSAGE] ${ev.data}`)
    // })
    // apiClient.socket.addEventListener('open', (ev) => {
    //   apiClient.joinRoom()
    // })
    // apiClient.socket.addEventListener('close', (ev) => {
    //   console.log('connection closed')
    // })
    // apiClient.socket.addEventListener('error', (ev) => {
    //   console.log('connection error')
    // })
  }, [playerId, initialized])

  const store = { clientRef }
  return <WSAPIContext.Provider value={store}>{children}</WSAPIContext.Provider>
}
