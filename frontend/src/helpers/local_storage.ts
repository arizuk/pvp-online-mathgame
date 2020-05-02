const LOCAL_STORAGE_PREFIX = 'mathgame.app'
const getLocalStorageKey = (key: string) => `${LOCAL_STORAGE_PREFIX}.${key}`

export const wrap = <V>(key: string, setter: (v: V) => void) => {
  return (v: V) => {
    setter(v)
    localStorage.setItem(getLocalStorageKey(key), (v as unknown) as string)
  }
}

export const readItems = <
  S extends { [key: string]: string },
  K extends keyof S & string
>(
  keys: K[]
): Partial<S> => {
  const items: Partial<S> = {}
  keys.forEach((key) => {
    const item = localStorage.getItem(getLocalStorageKey(key))
    if (item !== null) {
      items[key] = item as S[K]
    }
  })
  return items
}
