export interface IGiftCardCode {
  id?: number
  code: string
  wallet: string
  card: {
    id: number
    timestamp: number
  }
}
