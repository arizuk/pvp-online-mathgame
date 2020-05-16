const LOCAL_STORAGE_PREFIX = 'mathgame.app'
const getLocalStorageKey = (key: string) => `${LOCAL_STORAGE_PREFIX}.${key}`

export const wrap = <V>(key: string, setter: (v: V) => void) => {
  return (v: V) => {
    setter(v)
    localStorage.setItem(getLocalStorageKey(key), (v as unknown) as string)
  }
}

export const readItem = (key: string) =>
  localStorage.getItem(getLocalStorageKey(key))
