import { ethers } from 'ethers'

export enum MetamaskActionType {
  CONNECT_ACCOUNT = 'connect_account',
  DISCONNECT_ACCOUNT = 'disconnect_account',
  UPDATE_TOKEN_BALANCE = 'update_token_balance'
}

export interface IMetamaskReducerState {
  provider?: ethers.providers.Web3Provider
  account?: string
  balance?: string
  token?: string
  connected?: boolean
  connect?: () => void
  updateTokenBalance?: () => void
  disconnect?: () => void
}

export type MetamaskAction =
  | {
      type: MetamaskActionType.CONNECT_ACCOUNT
      payload: IMetamaskReducerState
    }
  | {
      type: MetamaskActionType.DISCONNECT_ACCOUNT
      payload: IMetamaskReducerState
    }
  | {
      type: MetamaskActionType.UPDATE_TOKEN_BALANCE
      payload: IMetamaskReducerState
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
