import { useState, useEffect, useRef, useReducer } from 'react'
import { Pages } from 'consts'
import * as localStorageHelper from 'helpers/local_storage'
import { APIClient } from 'api/client'
import { useAppReducer, Store, State } from './reducer'

export type AppStore = Store

const useAPIClient = (state: State) => {
  const [initialized, setInitialized] = useState(false)
  const ref = useRef<APIClient>()
  useEffect(() => {
    if (state.playerId && initialized === false) {
      const apiClient = new APIClient(null, state.playerId)
      apiClient.socket.addEventListener('message', (ev) => {
        console.log(`[ONMESSAGE] ${ev.data}`)
      })
      apiClient.socket.addEventListener('open', (ev) => {
        apiClient.join()
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

export const useAppState = () => {
  const [initialized, setInitialized] = useState(false)

  const { state, dispatch } = useAppReducer()
  const apiClientRef = useAPIClient(state)

  // Sync state with state stored in localStorage
  useEffect(() => {
    if (initialized === true) return

    const savedState = localStorageHelper.readItems<State, keyof State>(
      Object.keys(state) as Array<keyof State>
    )
    dispatch({ type: 'set', payload: savedState })
    setInitialized(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized])

  // redirect
  useEffect(() => {
    if (initialized === false) return
    if (state.page === Pages.PlayerEdit) return
    if (!state.playerId) {
      dispatch({ type: 'set', payload: { page: Pages.PlayerEdit } })
    }
  })

  const setPage = (v: Pages) => dispatch({ type: 'set', payload: { page: v } })
  const setPlayerId = (v: string) =>
    dispatch({ type: 'set', payload: { playerId: v } })

  const answer = (v: string) => {
    if (apiClientRef.current) {
      apiClientRef.current.answer(v)
    }
  }
  return {
    ...state,
    changePage: localStorageHelper.wrap('page', setPage),
    changePlayerId: localStorageHelper.wrap('playerId', setPlayerId),
    answer,
  }
}
