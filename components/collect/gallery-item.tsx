'use client'

import { Address } from '@turbo-eth/core-wagmi'
import { ethers } from 'ethers'
import { useEnsName } from 'wagmi'

import { useMintableErc721SnapGet } from '@/lib/blockchain'
import { GATEWAY_BASE } from '@/lib/ipfs'

import GalleryMintButton from './gallery-mint-button'
import TimeFromEpoch from '../shared/time-from-epoch'

interface GalleryItemProps {
  snap: `0x${string}`
}

type SnapDetails = {
  name: string
  description: string
  image: string
  externalLink: string
  sellerFeeBasisPoints: string
  feeRecipient: string
}

export default function GalleryItem({ snap }: GalleryItemProps) {
  const { data: snapDetails } = useMintableErc721SnapGet({
    address: snap,
  })

  const { data: ensName, isError, isLoading } = useEnsName({ address: snapDetails?.creator, chainId: 1 })

  return (
    <div className="min-w-full rounded-md bg-neutral-100 text-center dark:bg-neutral-800">
      {snapDetails ? (
        <div className="card flex flex-col items-center">
          <h2 className="text-gradient-sand my-2 text-3xl font-bold">{snapDetails.name}</h2>
          <img src={GATEWAY_BASE + snapDetails.image.replace('ipfs://', '')} alt="Minting Snap Image" width={600} />
          <h3 className="my-2 text-xl font-bold">{snapDetails.description}</h3>
          <div className="my-2">
            <span className="font-bold">by </span>
            {ensName && !isError && !isLoading ? (
              <span className="text-gradient-secondary text-xl font-medium">{ensName}</span>
            ) : (
              <Address address={snapDetails.creator} truncate className="text-gradient-secondary text-sm font-medium" />
            )}
          </div>
          <div className="my-2">
            {snapDetails.salePrice.isZero() ? (
              <p className="text-gradient-primary text-xl font-medium">FREE</p>
            ) : (
              <p className="text-gradient-primary text-xl font-medium">{ethers.utils.formatEther(snapDetails.salePrice.toString()).toString()} ETH</p>
            )}
          </div>

          <GalleryMintButton className="btn-blue btn-pill bg-gradient-button btn-xl mt-5 w-full max-w-lg py-6 text-2xl" snap={snap} />

          <div className="mt-2">
            <span className="text-xs">
              Collecting Ends: <TimeFromEpoch epoch={snapDetails.mintEndTime.toString()} />
            </span>
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
