import { Alchemy, Network } from 'alchemy-sdk'

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.OPT_MAINNET,
}

export const alchemyOptimism = new Alchemy(settings)
