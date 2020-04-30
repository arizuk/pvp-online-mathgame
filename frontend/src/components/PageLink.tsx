import { Pages } from 'consts'
import { useAppState } from 'contexts'
import React, { ReactNode } from 'react'

interface Props {
  to: Pages
  children?: ReactNode
}

function PageLink(props: Props) {
  const [, setPage] = useAppState('page')
  return <span onClick={() => setPage(props.to)}>{props.children}</span>
}

export default PageLink
