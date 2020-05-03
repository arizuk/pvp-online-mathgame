import { Pages } from 'consts'
import { useReducer } from 'react'

export type State = {
  page: Pages
  playerId: string
}
export type Actions = {
  changePage: (v: Pages) => void
  changePlayerId: (v: string) => void
  answer: (v: string) => void
}
export type Store = State & Actions

const initialState = {
  page: Pages.Home,
  playerId: '',
}

const reducer: React.Reducer<State, any> = (state: State, action: any) => {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.payload }
    default:
      throw new Error()
  }
}

export const useAppReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return {
    state,
    dispatch,
  }
}
