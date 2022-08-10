import { BigNumber } from 'ethers'
import { IGiftcard } from '../../context'

export interface ICustomError {
  hasError: boolean
  message: string
}

export interface IDrawerAppBarLink {
  text: string
  link: string
}

export interface IStoreGiftCard extends IGiftcard {
  isInCart: boolean
}

export interface IPurchasedGiftCard extends IGiftcard {
  timestamp: string
}

export interface IBlockchainGiftCard {
  imageHash: string
  price: BigNumber
  store: number
}

export interface IBlockchainUserCards {
  cardId: BigNumber
  timestamp: BigNumber
}
