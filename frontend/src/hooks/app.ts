import { useState, useEffect, useRef, useReducer } from 'react'
import { Pages } from 'consts'
import * as localStorageHelper from 'helpers/local_storage'
import { APIClient } from 'api/client'

type InitFlags = {
  sync: boolean
  ws: boolean
}

const initAPIClient = (playerId: string) => {
  const apiClient = new APIClient()
  apiClient.socket.addEventListener('message', (ev) => {
    console.log(`[ONMESSAGE] ${ev.data}`)
  })
  apiClient.socket.addEventListener('open', (ev) => {
    apiClient.join(playerId)
  })
  apiClient.socket.addEventListener('close', (ev) => {
    console.log('connection closed')
  })
  apiClient.socket.addEventListener('error', (ev) => {
    console.log('connection error')
  })
  return apiClient
}

type State = {
  page: Pages
  playerId: string
}
const reducer: React.Reducer<State, any> = (state: State, action: any) => {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.payload }
    default:
      throw new Error()
  }
}

export function useAppState() {
  const [state, dispatch] = useReducer(reducer, {
    page: Pages.Home,
    playerId: '',
  })
  const [flags, setFlags] = useState<InitFlags>({
    sync: false,
    ws: false,
  })
  const apiClientRef = useRef<APIClient>()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (flags.sync === false) {
      const savedState = localStorageHelper.readItems<State, keyof State>(
        Object.keys(state) as Array<keyof State>
      )
      dispatch({ type: 'set', payload: savedState })
      setFlags({ ...flags, sync: true })
      return
    }

    if (state.playerId && flags.ws === false) {
      apiClientRef.current = initAPIClient(state.playerId)
      setFlags({ ...flags, ws: true })
    }
  }, [flags, state])

  useEffect(() => {
    if (flags.sync === false) return
    if (state.page === Pages.PlayerEdit) return
    if (!state.playerId) {
      dispatch({ type: 'set', payload: { page: Pages.PlayerEdit } })
    }
  })

  const setPage = (v: Pages) => dispatch({ type: 'set', payload: { page: v } })
  const setPlayerId = (v: string) =>
    dispatch({ type: 'set', payload: { playerId: v } })

  return {
    ...state,
    changePage: localStorageHelper.wrap('page', setPage),
    changePlayerId: localStorageHelper.wrap('playerId', setPlayerId),
  }
}
