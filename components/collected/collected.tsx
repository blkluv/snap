'use client'

import { useNetwork } from 'wagmi'

import CollectedGrid from '@/components/collected/collected-grid'
import { useSnapFactoryGetVisibleSnaps } from '@/lib/blockchain'
import { useContractAutoLoad } from '@/lib/hooks/use-contract-auto-load'

export default function Collected() {
  const contractFactory = useContractAutoLoad('SnapFactory')

  const { chain } = useNetwork()

  const { data: snaps } = useSnapFactoryGetVisibleSnaps({
    address: contractFactory?.address,
  })

  if (chain?.id == 10) {
    return (
      <div className="min-w-full rounded-md bg-neutral-100 p-4 text-center dark:bg-neutral-800">
        {snaps && snaps.length > 0 ? (
          <>
            <h3 className="mb-8 pb-2 text-3xl font-bold">Visibile Snaps You Collected</h3>
            <CollectedGrid snaps={snaps} />
          </>
        ) : (
          <>
            <h3 className="mb-2 text-3xl font-bold">No Snaps Visible</h3>
            <p className="text-lg font-normal">Create a new Snap!</p>
          </>
        )}
      </div>
    )
  } else {
    return (
      <div className="min-w-full rounded-md bg-neutral-100 p-4 text-center dark:bg-neutral-800">
        <h3 className="mb-2 text-3xl font-bold">Please connect to Optimism</h3>
      </div>
    )
  }
}
