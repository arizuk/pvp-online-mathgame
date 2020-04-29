import React from "react"

export enum Pages {
  Top = "top",
  PlayerEdit = "playerEdit",
}

export const PageContext = React.createContext({
  page: "top",
  changePage: (page: Pages) => {},
})
