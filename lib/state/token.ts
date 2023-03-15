import { useCallback } from 'react'

import { SetStateAction, WritableAtom, atom, useAtom } from 'jotai'

const DEFAULT_BUILDER: any = []

let strAtom: WritableAtom<Array<any>, SetStateAction<Array<any>>>
strAtom = atom(DEFAULT_BUILDER)
if (typeof window !== 'undefined') {
  strAtom = atom(window?.localStorage.getItem('tokens') ? JSON.parse(window?.localStorage.getItem('tokens')) : `${DEFAULT_BUILDER}`)
} else {
  strAtom = atom(DEFAULT_BUILDER)
}

export const tokensWatching = atom(
  (get) => get(strAtom),
  (get, set, newStr: Array<number>) => {
    set(strAtom, newStr)
    localStorage.setItem('tokens', JSON.stringify(newStr))
  }
)

export const useTokensWatching = () => {
  const [tokenList, setTokenList] = useAtom(tokensWatching)
  const addToken = useCallback(
    (token: any) => {
      const newTokens = [...tokenList, token]
      setTokenList(newTokens)
    },
    [tokenList, setTokenList]
  )
  return [tokenList, addToken] as const
}
