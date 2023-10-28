// @ts-nocheck
'use client'
import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import Gallery from '@/components/collect/gallery'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import useScroll from '@/lib/hooks/use-scroll'

export default function Home() {
  const scrolled = useScroll(50)

  return (
    <>
      <div className="relative flex flex-1 pt-12">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center text-center">
          <motion.div
            className="max-w-5xl px-5 xl:px-0"
            initial="hidden"
            whileInView="show"
            animate="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}>
            <motion.h1
              className="text-gradient-primary text-center text-5xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[8rem]"
              variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer>Sell Your Story In 24 Hours</Balancer>
            </motion.h1>
            <motion.p className="mt-6 text-center text-gray-700 dark:text-gray-200 md:text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer className="text-2xl leading-8">Collect your favorite stories while they&apos;re still visible.</Balancer>
            </motion.p>
            <div className="mt-8 flex min-w-fit items-center justify-center">
              <BranchIsWalletConnected>
                <Gallery />
                <WalletConnect />
              </BranchIsWalletConnected>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
