import React from 'react'
import { Pages } from 'consts'
import { useAppState, AppStore } from 'hooks/app'

export const AppContext = React.createContext<AppStore>({
  page: Pages.Home,
  playerId: '',
  changePage: (v) => {},
  changePlayerId: (v) => {},
  dispatch: (v) => {},
})

export const AppContainer: React.FunctionComponent<{}> = (props) => {
  const store = useAppState()
  return (
    <AppContext.Provider value={store}>{props.children}</AppContext.Provider>
  )
}
