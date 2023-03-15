import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { erc20ABI } from 'wagmi'

import { MintableERC721SnapABI, SnapFactoryABI } from './abis'

export default defineConfig({
  out: 'lib/blockchain.ts',
  contracts: [
    {
      name: 'MintableERC721Snap',
      // @ts-ignore
      abi: MintableERC721SnapABI,
    },
    {
      name: 'SnapFactory',
      // @ts-ignore
      abi: SnapFactoryABI,
    },
  ],
  plugins: [react()],
})
