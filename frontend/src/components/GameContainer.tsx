import React, { useEffect, useContext, useState } from 'react'
import { WSAPIContext } from './WSAPIContainer'

type Context = {
  started: boolean
  setStarted: (v: boolean) => void
}
export const GameContext = React.createContext<Context>({
  started: false,
  setStarted: (v) => {},
})

export const GameContainer: React.FunctionComponent<{}> = ({ children }) => {
  const { wsApiRef, wsReady } = useContext(WSAPIContext)

  useEffect(() => {
    const client = wsApiRef?.current
    if (!client) return

    client.socket.addEventListener('message', (ev) => {
      alert(ev.data)
    })
  }, [wsApiRef, wsReady])

  const [started, setStarted] = useState(false)
  const store = { started, setStarted }
  return <GameContext.Provider value={store}>{children}</GameContext.Provider>
}
