import { useNetwork } from 'wagmi'

export function useContractAutoLoad(contract: string, chainId?: number): any {
  const { chain } = useNetwork()
  switch (chainId || chain?.id) {
    case 1:
      switch (contract) {
        case 'SnapFactory':
          return {
            address: '',
            abi: [],
          }
        default:
          throw new Error(`Unknown contract ${contract}`)
      }
    case 10:
      switch (contract) {
        case 'SnapFactory':
          return {
            address: '',
            abi: [],
          }
        default:
          throw new Error(`Unknown contract ${contract}`)
      }
    case 5:
      switch (contract) {
        case 'SnapFactory':
          return {
            address: '',
            abi: [],
          }
        default:
          throw new Error(`Unknown contract ${contract}`)
      }
    case 31337:
      switch (contract) {
        case 'SnapFactory':
          return {
            address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
            abi: [],
          }
        default:
          throw new Error(`Unknown contract ${contract}`)
      }
    default:
      throw new Error(`Unknown network ${chain?.id}`)
  }
}
