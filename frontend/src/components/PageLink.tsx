import { Pages } from 'consts'
import { AppContext } from 'containers/App'
import React, { ReactNode, useContext } from 'react'

interface Props {
  to: Pages
  children?: ReactNode
}

function PageLink(props: Props) {
  const { changePage } = useContext(AppContext)
  return <span onClick={() => changePage(props.to)}>{props.children}</span>
}

export default PageLink
