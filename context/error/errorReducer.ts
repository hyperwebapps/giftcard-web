import { IErrorReducerState } from '../types'

export const errorInitialState: IErrorReducerState = {
  hasError: false,
  message: '',
  reset: function (): void {
    throw new Error('Function not implemented.')
  },
  throwError: function (): void {
    throw new Error('Function not implemented.')
  }
}

const errorReducer = (state: any, action: any) => {
  const { type, payload } = action

  switch (type) {
    case 'THROW_ERROR':
      return {
        ...state,
        hasError: payload.hasError,
        message: payload.message
      }
    case 'RESET_ERROR':
      return {
        ...state,
        hasError: payload.hasError,
        message: payload.message
      }
    default:
      throw new Error(`No case ${type} for Error reducer`)
  }
}
export default errorReducer
