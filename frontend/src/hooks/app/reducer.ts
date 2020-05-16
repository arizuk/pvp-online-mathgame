import { useReducer } from 'react'
import { AppState } from './types'
import { Action } from './actions'

const initialState: AppState = {
  playerId: '',
  appReady: false,
}
const reducer: React.Reducer<AppState, Action> = (
  state: AppState,
  action: Action
) => {
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
