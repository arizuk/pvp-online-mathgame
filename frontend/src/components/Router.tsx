import React, { useContext, useState } from 'react'
import { Page } from 'consts'

type RouteProps = {
  page: Page
  component: () => JSX.Element | null
}
export const Route: React.FunctionComponent<RouteProps> = ({ component }) => {
  return React.createElement(component)
}

export const RouterContext = React.createContext<{
  page: Page
  goToPage: (p: Page) => void
}>({
  page: 'home',
  goToPage: (p) => {},
})
export const Router: React.FunctionComponent<{}> = ({ children }) => {
  const [page, setPage] = useState<Page>('home')
  const state = {
    page,
    goToPage: setPage,
  }
  return (
    <RouterContext.Provider value={state}>{children}</RouterContext.Provider>
  )
}

export const Switch: React.FunctionComponent<{}> = ({ children }) => {
  const { page } = useContext(RouterContext)

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
