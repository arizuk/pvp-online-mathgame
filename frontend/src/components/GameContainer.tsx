import React, { useState } from 'react'

type Context = {
  started: boolean
  setStarted: (v: boolean) => void
}
export const GameContext = React.createContext<Context>({
  started: false,
  setStarted: (v) => {},
})

export const GameContainer: React.FunctionComponent<{}> = ({ children }) => {
  const [started, setStarted] = useState(false)
  const store = { started, setStarted }
  return <GameContext.Provider value={store}>{children}</GameContext.Provider>
}
