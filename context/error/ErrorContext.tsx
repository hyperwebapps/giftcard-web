import { createContext, useContext, useReducer } from 'react'
import errorReducer, { errorInitialState } from './errorReducer'

const ErrorContext = createContext(errorInitialState)

export const ErrorProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(errorReducer, errorInitialState)

  const throwError = (message: string) => {
    dispatch({
      type: 'THROW_ERROR',
      payload: {
        hasError: true,
        message
      }
    })
  }

  const reset = () => {
    dispatch({
      type: 'RESET_ERROR',
      payload: {
        hasError: false,
        message: ''
      }
    })
  }

  const value = {
    hasError: state.hasError,
    message: state.message,
    throwError,
    reset
  }

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

const useError = () => {
  const context = useContext(ErrorContext)

  if (context === undefined) {
    throw new Error('useError must be used within ErrorContext')
  }

  return context
}

export default useError
