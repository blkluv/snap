'use client'

import { Address } from '@turbo-eth/core-wagmi'
import Image from 'next/image'
import { useEnsName } from 'wagmi'

import { useMintableErc721SnapGet } from '@/lib/blockchain'
import { GATEWAY_BASE } from '@/lib/ipfs'

import TimeFromEpoch from '../shared/time-from-epoch'

interface CollectedItemProps {
  snap: string
}

export default function CollectedItem({ snap }: CollectedItemProps) {
  const { data: snapDetails } = useMintableErc721SnapGet({
    address: snap as `0x${string}`,
  })

  const { data: ensName, isError, isLoading } = useEnsName({ address: snapDetails?.creator, chainId: 1 })

  return (
    <div className="min-w-full rounded-md bg-neutral-100 text-center dark:bg-neutral-800">
      {snapDetails ? (
        <div className="card flex flex-col items-center">
          <h2 className="text-gradient-sand my-2 text-3xl font-bold">{snapDetails.name}</h2>
          <Image src={GATEWAY_BASE + snapDetails.image.replace('ipfs://', '')} alt="Collected Snap Image" width={600} height={600} />
          <h3 className="my-2 text-xl font-bold">{snapDetails.description}</h3>
          <div className="my-2">
            <span className="font-bold">by </span>
            {ensName && !isError && !isLoading ? (
              <span className="text-gradient-secondary text-xl font-medium">{ensName}</span>
            ) : (
              <Address address={snapDetails.creator} truncate className="text-gradient-secondary text-sm font-medium" />
            )}
          </div>
          <div>
            <span className="text-xs">
              Visible Until: <TimeFromEpoch epoch={snapDetails.visibleEndTime.toString()} />
            </span>
          </div>
        </div>
      ) : (
        <>
          <p className="text-lg font-normal">Loading..</p>
        </>
      )}
    </div>
  )
}
