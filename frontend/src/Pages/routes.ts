import { Pages } from "contexts/page"

import Top from "./Top"
import PlayerEdit from "./PlayerEdit"

const routes: { [index: string]: () => JSX.Element } = {
  [Pages.Top]: Top,
  [Pages.PlayerEdit]: PlayerEdit,
}

export function getRoute(page: string) {
  return routes[page]
}
