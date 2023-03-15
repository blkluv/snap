import * as React from 'react'

import classNames from 'clsx'
import { BigNumber } from 'ethers'
import { useAccount, useWaitForTransaction } from 'wagmi'

import { useMintableErc721SnapGetMintFee, useMintableErc721SnapGetSalePrice, useMintableErc721SnapMint } from '@/lib/blockchain'
import { toast } from '@/lib/hooks/use-toast'
// import useAddMintedToken from '@/lib/hooks/app/use-add-minted-token'

interface GalleryMintButtonProps {
  className?: string
  label?: string
  snap: `0x${string}`
}

export const GalleryMintButton = ({ className, label = 'Collect', snap }: GalleryMintButtonProps) => {
  const { address } = useAccount()

  const { data: salePrice } = useMintableErc721SnapGetSalePrice({
    address: snap,
  })

  const { data: mintFee } = useMintableErc721SnapGetMintFee({
    address: snap,
  })

  const { write, data, status, error } = useMintableErc721SnapMint({
    address: snap,
    args: [address],
    overrides: {
      value: salePrice && salePrice?.isZero() ? mintFee : salePrice?.add(mintFee as BigNumber),
    },
  })

  const { isLoading, isSuccess, isError, isFetched } = useWaitForTransaction({
    hash: data?.hash,
  })

  if (!isLoading && isFetched && isSuccess) {
    toast({ id: 'MINT_TOAST', title: 'COLLECTED SUCCESSFULLY 🎉', description: <p>Congrats! You collected this Snap</p> }, 'MINT_TOAST')
  } else if (!isLoading && isFetched && isError) {
    toast({ id: 'ERROR_TOAST', title: 'Error Collecting' }, 'ERROR_TOAST')
  }
  // useAddMintedToken(data?.hash as string)

  const classes = classNames(className, 'PixelStoreMintButton', 'btn mb-2')
  return (
    <>
      <button disabled={!write || isLoading} onClick={write} className={classes}>
        {status == 'loading' ? 'Collecting..' : label}
      </button>
      {status === 'error' && error?.code == 4001 && <div className="text-center text-red-500">{error?.message}</div>}
      {status === 'error' && error?.code != 4001 && <div className="text-center text-red-500">Insufficient Balance</div>}
    </>
  )
}

export default GalleryMintButton
