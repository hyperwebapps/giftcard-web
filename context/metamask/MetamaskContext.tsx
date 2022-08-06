import { ethers } from 'ethers'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { contractAddress } from '../../utils'
import { chains, convertBalance, convertToHex, convertToString, sliceWallet } from '../../utils/web3'
import metamaskReducer, { initialState } from './metamaskReducer'
import { GiftCardAbi } from '../../utils'
import useError from '../error/ErrorContext'
import { ProviderRpcError } from '../types'

const MetamaskContext = createContext(initialState)

export const MetamaskProvider = ({ children }: any) => {
  const { throwError } = useError()
  const [state, dispatch] = useReducer(metamaskReducer, initialState)

  useEffect(() => {
    const switchChain = async () => {
      if (window.ethereum.networkVersion !== '43112') {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: convertToHex(43112) }]
          })
        } catch (err: any) {
          if (err.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [chains[0]]
            })
          } else {
            throwError(err.message)
          }
        }
      }
    }

    switchChain()
  }, [state.provider])

  const connect = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const address = await provider.getSigner(0).getAddress()
      const addressBalance = await provider.getBalance(address)
      const slicedAccount = sliceWallet(address)
      const convertedBalance = convertBalance(addressBalance)

      dispatch({
        type: 'CONNECT_ACCOUNT',
        payload: {
          provider: provider,
          account: slicedAccount,
          balance: convertedBalance,
          token: '0',
          connected: window.ethereum.networkVersion === '43112'
        }
      })
    } catch (error: any) {
      throwError(error.message)
    }
  }

  const updateTokenBalance = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, GiftCardAbi, state.provider)
      await contract.callStatic.balanceOf(state.provider.getSigner().getAddress())
      const tokenBalance = await contract.balanceOf(state.provider.getSigner().getAddress())

      dispatch({
        type: 'UPDATE_TOKEN_BALANCE',
        payload: {
          token: convertToString(tokenBalance)
        }
      })
    } catch (error: any) {
      throwError('Token balance not available at the moment.')
    }
  }

  const disconnect = async () => {
    await window.ethereum?.on('disconnect', (error: ProviderRpcError) => {
      throwError(error.message)
    })

    dispatch({
      type: 'DISCONNECT_ACCOUNT',
      payload: {
        provider: null,
        account: '0x',
        balance: '0',
        token: '0',
        connected: false
      }
    })
  }

  const value = {
    provider: state.provider,
    account: state.account,
    balance: state.balance,
    token: state.token,
    connected: state.connected,
    connect,
    disconnect,
    updateTokenBalance
  }
  return <MetamaskContext.Provider value={value}>{children}</MetamaskContext.Provider>
}

const useMetamask = () => {
  const context = useContext(MetamaskContext)

  if (context === undefined) {
    throw new Error('useMetamask must be used within MetamaskContext')
  }

  return context
}

export default useMetamask
