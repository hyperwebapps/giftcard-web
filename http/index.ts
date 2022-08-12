import axios from 'axios'
import { keyGenerator } from '../utils'
import { IGiftCardCode } from './types'

const instance = axios.create({
  baseURL: 'http://localhost:3004',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const addGiftCardCode = async (publicKey: string, cardId: number): Promise<void> => {
  const giftcardCode = keyGenerator()
  const card: IGiftCardCode = {
    code: giftcardCode,
    wallet: publicKey,
    card: {
      id: cardId,
      timestamp: Date.now()
    }
  }
  await instance.post('/giftcards', card)
}

export const getUserCards = async (publicKey: string): Promise<IGiftCardCode[]> => {
  const giftcards = await instance.get(`/giftcards?key=${publicKey}`)
  return giftcards.data as IGiftCardCode[]
}
