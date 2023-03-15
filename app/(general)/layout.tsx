'use client'
import classNames from 'clsx'

import { NetworkStatus } from '@/components/blockchain/network-status'
import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

export default function GeneralLayout({ children }: any) {
  const classes = classNames('App', 'bg-gradient-dark min-h-[100vh] flex flex-col pb-10 lg:pb-32')
  return (
    <>
      <div className={classes}>
        <Header />
        <main className="my-32 flex flex-1 flex-col md:px-10 lg:my-20 lg:py-20">{children}</main>
        <Footer />
      </div>
    </>
  )
}
