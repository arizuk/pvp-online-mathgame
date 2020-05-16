import React, { useState, useEffect } from 'react'
import * as localStorageHelper from 'helpers/local_storage'

type Context = {
  playerId: string
  appReady: boolean
  changePlayerId: (v: string) => void
}
export const AppContext = React.createContext<Context>({
  playerId: '',
  appReady: false,
  changePlayerId: () => {},
})

export const AppContainer: React.FunctionComponent<{}> = ({ children }) => {
  const [initialized, setInitialized] = useState(false)
  const [playerId, setPlayerId] = useState('')

  // Sync state with state stored in localStorage
  useEffect(() => {
    if (initialized === true) return
    const item = localStorageHelper.readItem('playerId')
    if (item) {
      setPlayerId(item)
    }
    setInitialized(true)
  }, [initialized])

  const store = {
    playerId,
    appReady: initialized,
    changePlayerId: localStorageHelper.wrap('playerId', setPlayerId),
  }
  return (
    <AppContext.Provider value={store}>
      {store.appReady ? children : <h1>NOW LOADING</h1>}
    </AppContext.Provider>
  )
}
