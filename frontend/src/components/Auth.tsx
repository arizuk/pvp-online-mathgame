import React, { useContext, useEffect } from 'react'
import { Page } from 'consts'
import { AppContext } from 'containers/App'
import { RouterContext } from './Router'

const Redirect = ({ page }: { page: Page }) => {
  const { goToPage } = useContext(RouterContext)
  useEffect(() => goToPage(page))
  return <></>
}

const Auth: React.FunctionComponent<{}> = ({ children }) => {
  const { playerId } = useContext(AppContext)
  if (playerId) {
    return <>{children}</>
  } else {
    return <Redirect page="playerEdit"></Redirect>
  }
}

export default Auth
