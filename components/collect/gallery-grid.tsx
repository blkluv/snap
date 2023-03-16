'use client'

import GalleryItem from './gallery-item'

interface GalleryGridProps {
  snaps: readonly `0x${string}`[]
}

export default function GalleryGrid({ snaps }: GalleryGridProps) {
  return (
    <div className="flex flex-col rounded-md bg-neutral-100 text-center dark:bg-neutral-800">
      {snaps.map((snapAddress, index) => {
        if (snapAddress == '0x98E2f4112E1d1CCd84f3FA77E6b229d9962fC275') return
        return (
          <div key={`collect-snap-${index}`} className="mb-10">
            <GalleryItem snap={snapAddress} />
          </div>
        )
      })}
    </div>
  )
}
