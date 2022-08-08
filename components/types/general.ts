export interface ICustomError {
  hasError: boolean
  message: string
}

export interface IDrawerAppBarLink {
  text: string
  link: string
}

export interface IStoreGiftCard {
  id: number
  imageHash: string
  text: string
  price: string
  isInCart: boolean
}
