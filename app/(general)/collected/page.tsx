'use client'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import Collected from '@/components/collected/collected'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'

export default function Home() {
  return (
    <div className="max-w-5xl self-center px-5 text-center xl:px-0">
      <BranchIsWalletConnected>
        <Collected />
        <WalletConnect />
      </BranchIsWalletConnected>
    </div>
  )
}
