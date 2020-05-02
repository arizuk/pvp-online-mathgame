import React from 'react'
import { Pages } from 'consts'
import { useAppState } from 'hooks/app'

type Store = {
  page: Pages
  playerId: string
  changePage: (v: Pages) => void
  changePlayerId: (v: string) => void
}
export const AppContext = React.createContext<Store>({
  page: Pages.Home,
  playerId: '',
  changePage: (v) => {},
  changePlayerId: (v) => {},
})

export const AppContainer: React.FunctionComponent<{}> = (props) => {
  const store = useAppState()
  return (
    <AppContext.Provider value={store}>{props.children}</AppContext.Provider>
  )
}
