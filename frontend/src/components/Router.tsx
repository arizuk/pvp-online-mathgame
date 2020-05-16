import React, { useContext } from 'react'
import { Page } from 'consts'
import { AppContext } from 'containers/App'
type Props = {
  page: Page
  component: () => JSX.Element | null
}

export const Route: React.FunctionComponent<Props> = ({ component }) => {
  return React.createElement(component)
}

export const Router: React.FunctionComponent<{}> = ({ children }) => {
  return <>{children}</>
}

export const Switch: React.FunctionComponent<{}> = ({ children }) => {
  const { page } = useContext(AppContext)

  let element = null
  let match = false
  React.Children.forEach(children, (child: any) => {
    if (match === false) element = child
    if (page === child.props.page) {
      element = child
      match = true
    }
  })
  return element
}
