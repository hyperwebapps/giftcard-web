import { BigNumber, ethers } from 'ethers'
import { IChain } from './types'

export const sliceWallet = (wallet: string): string => {
  const startWallet = wallet.slice(0, 6)
  const endWallet = wallet.slice(-4)
  return `${startWallet}...${endWallet}`
}

export const convertBalance = (balance: BigNumber): string => {
  const decimalBalance = ethers.utils.formatEther(balance)
  return parseFloat(decimalBalance).toFixed(2)
}

export const convertToNumber = (value: BigNumber): number => {
  return BigNumber.from(value).toNumber()
}

export const convertToString = (token: BigNumber): string => {
  return BigNumber.from(token).toString()
}

export const convertToDate = (timestamp: number): string => {
  const localDate: Date = new Date(timestamp)
  return localDate.toLocaleDateString()
}

export const convertToHex = (chainId: number): string => {
  return BigNumber.from(chainId).toHexString()
}

export const isSufficientBalance = (balance: string, tokenAmount: string): boolean => {
  return parseInt(balance) > parseInt(tokenAmount) / 1e15
}

export const chains: IChain[] = [
  {
    chainName: 'AVAX LT Network',
    chainId: convertToHex(43112),
    nativeCurrency: { name: 'AVAX', decimals: 0, symbol: 'AVAX' },
    rpcUrls: ['http://127.0.0.1:9650/ext/bc/C/rpc']
  }
]

export const cardText: string[] = [
  'Apple Gift Card - Email Delivery',
  'Green Mastercard Gift Card',
  'Google Play Gift Code',
  'OTTO Brisbane Gift Card',
  'Roblox Gift Card',
  'Spotify Gift Card'
]
