import React, { useContext, useEffect } from 'react'
import { Page } from 'consts'
import { AppContext } from 'containers/App'

const Redirect = ({ page }: { page: Page }) => {
  const { changePage } = useContext(AppContext)
  useEffect(() => changePage(page))
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
