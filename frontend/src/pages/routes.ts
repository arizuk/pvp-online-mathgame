import { Pages } from 'consts'

import Home from './Home'
import PlayerEdit from './PlayerEdit'

const routes: { [index: string]: () => JSX.Element } = {
  [Pages.Home]: Home,
  [Pages.PlayerEdit]: PlayerEdit,
}

export function getCurrentPage(page: string) {
  return routes[page]
}
