import { useEffect, useState } from 'react'

import { utils } from 'ethers'
import { useWaitForTransaction } from 'wagmi'

import { mintableErc721SnapABI } from '@/lib/blockchain'

export function useSnapDecodeEvents(hash: string): any {
  const contractInterface = new utils.Interface(mintableErc721SnapABI)

  const { data, error, isSuccess, isError, isLoading } = useWaitForTransaction({
    hash: hash as `0x${string}`,
  })

  const [decodedEvents, setDecodedEvents] = useState<any>()
  useEffect(() => {
    if (isSuccess) {
      // @ts-ignore
      const decoded = contractInterface.parseLog(data?.logs[0])
      setDecodedEvents(decoded)
    }
  }, [isSuccess])

  return {
    data: decodedEvents,
    error,
    isSuccess,
    isError,
    isLoading,
  }
}

export default useSnapDecodeEvents
