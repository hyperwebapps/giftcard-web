export interface IChain {
  chainName: string
  chainId: string
  nativeCurrency: INativeCurrency
  rpcUrls: string[]
}

export interface INativeCurrency {
  name: string
  decimals: number
  symbol: string
}
