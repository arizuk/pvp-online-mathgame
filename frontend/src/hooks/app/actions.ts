import { APIClient } from 'api/client'

import { AppState } from './types'

type APIClientRef = React.MutableRefObject<APIClient | undefined>

type SetAction = {
  type: 'set'
  payload: Partial<AppState>
}
type AnswerAction = {
  type: 'answer'
  value: string
}
type StartGameAction = {
  type: 'start_game'
}
export type Action = SetAction | AnswerAction | StartGameAction

export function wrapDispatch(
  ref: APIClientRef,
  dispatch: React.Dispatch<Action>
) {
  return (action: Action) => {
    switch (action.type) {
      case 'answer':
        if (ref.current) answer(dispatch, ref.current, action)
        return
      case 'start_game':
        if (ref.current) startGame(dispatch, ref.current, action)
        return
      default:
        dispatch(action)
    }
  }
}

const answer = (
  dispatch: React.Dispatch<Action>,
  apiClient: APIClient,
  action: AnswerAction
) => {
  apiClient.answer(action.value)
}

const startGame = (
  dispatch: React.Dispatch<Action>,
  apiClient: APIClient,
  action: StartGameAction
) => {
  apiClient.startGame()
}
