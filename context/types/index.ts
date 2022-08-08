import { ethers } from 'ethers'

export interface IMetamaskReducerState {
  provider?: ethers.providers.Web3Provider
  account: string
  balance: string
  token: string
  connected: boolean
  connect: () => void
  updateTokenBalance: () => void
  disconnect: () => void
}

export interface IGiftcard {
  id: number
  imageHash: string
  price: string
  store?: number
  text: string
}

export interface IErrorReducerState {
  hasError: boolean
  message: string
  reset: () => void
  throwError: (message: string) => void
}

export interface ProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}
