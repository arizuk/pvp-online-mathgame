import React, { useContext, useEffect } from 'react'
import { Pages } from 'consts'
import { AppContext } from 'containers/App'

const Redirect = ({ page }: { page: Pages }) => {
  const { changePage } = useContext(AppContext)
  useEffect(() => changePage(page))
  return <></>
}

const Auth: React.FunctionComponent<{}> = ({ children }) => {
  const { playerId } = useContext(AppContext)
  if (playerId) {
    return <>{children}</>
  } else {
    return <Redirect page={Pages.PlayerEdit}></Redirect>
  }
}

export default Auth
