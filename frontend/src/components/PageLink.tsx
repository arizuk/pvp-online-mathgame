import './PageLink.css'

import { Page } from 'consts'
import React, { ReactNode, useContext } from 'react'
import { RouterContext } from './Router'

interface Props {
  to: Page
  children?: ReactNode
}

function PageLink(props: Props) {
  const { goToPage } = useContext(RouterContext)
  return (
    <span className="PageLink" onClick={() => goToPage(props.to)}>
      {props.children}
    </span>
  )
}

export default PageLink
