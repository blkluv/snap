'use client'

import { useAccount, useQuery } from 'wagmi'

import { alchemyOptimism } from '@/data/alchemy'

import CollectedItem from './collected-item'

interface CollectedGridProps {
  snaps: readonly `0x${string}`[]
}

export default function CollectedGrid({ snaps }: CollectedGridProps) {
  const { address } = useAccount()

  const { data } = useQuery(['collected', address], async () => {
    const res = alchemyOptimism.nft.getNftsForOwner(address as string, {
      contractAddresses: snaps.slice(0, 20) as string[],
    })
    return res
  })

  if (!data?.ownedNfts || data?.ownedNfts?.length === 0)
    return (
      <div className="flex flex-col justify-center">
        <h3 className="mb-2 text-3xl font-bold">No Magic Visible</h3>
        <p className="text-lg font-normal">Collect a Magic!</p>
      </div>
    )
  return (
    <div className="flex flex-col rounded-md bg-neutral-100 p-8 text-center dark:bg-neutral-800">
      {data?.ownedNfts?.map((token, idx) => {
        console.log('snap return data: ', token)
        return (
          <div key={idx} className="mb-10">
            <CollectedItem snap={token?.contract.address} />
          </div>
        )
      })}
    </div>
  )
}
