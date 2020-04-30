import { createGlobalState } from 'react-hooks-global-state'
import { Pages } from 'consts'

interface AppState {
  page: Pages
  playerId: string
}

const initialState: AppState = {
  page: Pages.Home,
  playerId: '',
}
const { useGlobalState, setGlobalState } = createGlobalState(initialState)

const LOCAL_STORAGE_PREFIX = 'mathgame.app'

const getLocalStorageKey = (key: string) => {
  return `${LOCAL_STORAGE_PREFIX}.${key}`
}

export const useAppState = (key: keyof AppState) => {
  const [value, setValue] = useGlobalState(key)
  const updater = (v: AppState[keyof AppState]) => {
    setValue(v)
    localStorage.setItem(getLocalStorageKey(key), v)
  }
  return [value, updater] as const
}

export function syncAppStateWithStorage() {
  Object.keys(initialState).forEach((key) => {
    const item = localStorage.getItem(getLocalStorageKey(key))
    if (item !== null) {
      setGlobalState(key as keyof AppState, item)
    }
  })
}
