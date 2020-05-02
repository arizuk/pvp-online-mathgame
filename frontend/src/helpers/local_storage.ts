const LOCAL_STORAGE_PREFIX = 'mathgame.app'
const getLocalStorageKey = (key: string) => `${LOCAL_STORAGE_PREFIX}.${key}`

export const wrapSetter = <V>(key: string, setter: (v: V) => void) => {
  return (v: V) => {
    setter(v)
    localStorage.setItem(getLocalStorageKey(key), (v as unknown) as string)
  }
}

export const syncWithLocalStorage = <S extends object>(object: S) => {
  // TODO: stringからcastできる型じゃない場合だめそう

  const setItem = <K extends keyof S>(key: K, item: unknown) => {
    object[key] = item as S[K]
  }

  Object.keys(object).forEach((key) => {
    const item = localStorage.getItem(getLocalStorageKey(key))
    if (item !== null) {
      setItem(key as keyof S, item)
    }
  })
}
