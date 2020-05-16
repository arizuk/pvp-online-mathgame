import { useState, useEffect, useRef } from 'react'
import { Pages } from 'consts'
import * as localStorageHelper from 'helpers/local_storage'
import { APIClient } from 'api/client'

import { AppState } from './types'
import { Action, wrapDispatch } from './actions'
import { useAppReducer } from './reducer'

const useAPIClient = (state: AppState) => {
  const [initialized, setInitialized] = useState(false)
  const ref = useRef<APIClient>()
  useEffect(() => {
    if (state.playerId && initialized === false) {
      const apiClient = new APIClient(null, state.playerId)
      apiClient.socket.addEventListener('message', (ev) => {
        console.log(`[ONMESSAGE] ${ev.data}`)
      })
      apiClient.socket.addEventListener('open', (ev) => {
        apiClient.joinRoom()
      })
      apiClient.socket.addEventListener('close', (ev) => {
        console.log('connection closed')
      })
      apiClient.socket.addEventListener('error', (ev) => {
        console.log('connection error')
      })

      ref.current = apiClient
      setInitialized(true)
    }
  }, [initialized, state])
  return ref
}

type AppMethods = {
  changePage: (v: Pages) => void
  changePlayerId: (v: string) => void
  dispatch: React.Dispatch<Action>
}
export type AppStore = AppState & AppMethods

export const useAppState = (): AppStore => {
  const [initialized, setInitialized] = useState(false)

  const { state, dispatch } = useAppReducer()
  const apiClientRef = useAPIClient(state)
  const wrappedDispatch = wrapDispatch(apiClientRef, dispatch)

  // Sync state with state stored in localStorage
  useEffect(() => {
    if (initialized === true) return

    // TODO: べたがきやめる
    let savedState: { [key: string]: any } = {}
    const keys = ['page', 'playerId']
    keys.forEach((key) => {
      const item = localStorageHelper.readItem(key)
      if (item !== null) {
        savedState[key] = item
      }
    })
    dispatch({ type: 'set', payload: savedState })
    setInitialized(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized])

  const setPage = (v: Pages) => dispatch({ type: 'set', payload: { page: v } })
  const setPlayerId = (v: string) =>
    dispatch({ type: 'set', payload: { playerId: v } })

  return {
    ...state,
    appReady: initialized,
    changePage: localStorageHelper.wrap('page', setPage),
    changePlayerId: localStorageHelper.wrap('playerId', setPlayerId),
    dispatch: wrappedDispatch,
  }
}
