'use client'

import { useSnapFactoryGetActiveSnaps } from '@/lib/blockchain'
import { useContractAutoLoad } from '@/lib/hooks/use-contract-auto-load'

import GalleryGrid from './gallery-grid'

export default function Gallery() {
  const contractFactory = useContractAutoLoad('SnapFactory')

  const { data: snaps } = useSnapFactoryGetActiveSnaps({
    address: contractFactory?.address,
  })

  return (
    <div className="min-w-full rounded-md bg-neutral-100 p-4 text-center dark:bg-neutral-800">
      {snaps && snaps.length > 0 ? (
        <>
          <h3 className="mb-8 pb-2 text-3xl font-bold">Collectable</h3>
          <GalleryGrid snaps={snaps} />
        </>
      ) : (
        <>
          <h3 className="mb-2 text-3xl font-bold">No Snaps Available to Collect</h3>
          <p className="text-lg font-normal">Make a Snap - Tell your story</p>
        </>
      )}
    </div>
  )
}
