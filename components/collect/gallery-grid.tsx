'use client'

import GalleryItem from './gallery-item'

interface GalleryGridProps {
  snaps: readonly `0x${string}`[]
}

export default function GalleryGrid({ snaps }: GalleryGridProps) {
  return (
    <div className="flex flex-col rounded-md bg-neutral-100 text-center dark:bg-neutral-800">
      {snaps.map((snapAddress, index) => {
        return (
          <div key={`collect-snap-${index}`} className="mb-10">
            <GalleryItem snap={snapAddress} />
          </div>
        )
      })}
    </div>
  )
}
