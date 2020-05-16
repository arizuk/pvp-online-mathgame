import React from 'react'
import { Pages } from 'consts'
import { useAppState, AppStore } from 'hooks/app'

export const AppContext = React.createContext<AppStore>({
  page: Pages.Home,
  playerId: '',
  appReady: false,
  changePage: (v) => {},
  changePlayerId: (v) => {},
  dispatch: (v) => {},
})

export const AppContainer: React.FunctionComponent<{}> = ({ children }) => {
  const store = useAppState()
  return (
    <AppContext.Provider value={store}>
      {store.appReady ? children : <h1>NOW LOADING</h1>}
    </AppContext.Provider>
  )
}
