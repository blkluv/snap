import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useTokensWatching } from '@/lib/state/token'

import { useSnapDecodeEvents } from './use-snap-decode-events'

export function useAddMintedToken(hash: string) {
  const [_tokens, addToken] = useTokensWatching()
  const { data, isSuccess } = useSnapDecodeEvents(hash)
  const router = useRouter()
  useEffect(() => {
    if (isSuccess && data && data.name === 'Transfer' && data.args.from === '0x0000000000000000000000000000000000000000') {
      console.log('Minted token', JSON.stringify(data.args))
      addToken({ id: data.args.id.toString(), hash })
    }
  }, [isSuccess, data])
}

export default useAddMintedToken
