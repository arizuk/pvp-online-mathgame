import './PageLink.css'

import { Page } from 'consts'
import { AppContext } from 'containers/App'
import React, { ReactNode, useContext } from 'react'

interface Props {
  to: Page
  children?: ReactNode
}

function PageLink(props: Props) {
  const { changePage } = useContext(AppContext)
  return (
    <span className="PageLink" onClick={() => changePage(props.to)}>
      {props.children}
    </span>
  )
}

export default PageLink
