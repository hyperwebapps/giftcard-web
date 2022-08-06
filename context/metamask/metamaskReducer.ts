import { IMetamaskReducerState } from '../types'

export const initialState: IMetamaskReducerState = {
  account: '',
  balance: '0',
  token: '0',
  connected: false,
  connect: function (): void {
    throw new Error('Function not implemented.')
  },
  disconnect: function (): void {
    throw new Error('Function not implemented.')
  },
  updateTokenBalance: function (): void {
    throw new Error('Function not implemented.')
  }
}

const metamaskReducer = (state: any, action: any) => {
  const { type, payload } = action

  switch (type) {
    case 'CONNECT_ACCOUNT':
      return {
        ...state,
        provider: payload.provider,
        account: payload.account,
        balance: payload.balance,
        token: payload.token,
        connected: payload.connected
      }

    case 'DISCONNECT_ACCOUNT':
      return {
        ...state,
        provider: payload.provider,
        account: payload.account,
        balance: payload.balance,
        token: payload.token,
        connected: payload.connected
      }

    case 'UPDATE_TOKEN_BALANCE':
      return {
        ...state,
        token: payload.token
      }

    default:
      throw new Error(`No case for type: ${type}`)
  }
}

export default metamaskReducer
