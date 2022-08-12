export * from './env'
export * from './web3'
export * from './abi'
export * from './types'

export const keyGenerator = (): string => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  let str = ''
  for (let i = 0; i < 16; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return str
}
