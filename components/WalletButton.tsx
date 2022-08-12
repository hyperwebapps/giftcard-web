import { Stack, Box } from '@mui/material'
import React from 'react'
import useMetamask from '../context/metamask/MetamaskContext'
import useError from '../context/error/ErrorContext'

export const WalletButton = () => {
  const { throwError } = useError()
  const { disconnect, connect, connected, balance, account } = useMetamask()

  const handleClick = async () => {
    try {
      if (connect !== undefined) {
        connect()
      }
    } catch (error: any) {
      throwError(error.message)
    }
  }

  return (
    <Stack
      direction="row"
      sx={{
        bgcolor: '#4F5D75',
        p: `0.1rem 0.1rem 0.1rem ${connected ? '0.9rem' : '0.1rem'}`,
        borderRadius: 4,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
      }}
    >
      <>
        {connected ? <Box sx={{ mt: '0.4rem', mr: '0.7rem' }}>{balance} AVAX</Box> : <></>}
        <Box
          sx={{
            bgcolor: '#EF8354',
            p: '0.4rem 0.8rem',
            borderRadius: 3.5,
            cursor: 'pointer'
          }}
          onClick={() => {
            if (disconnect !== undefined) {
              connected ? disconnect() : handleClick()
            } else {
              throwError('Something went wrong with disconnection')
            }
          }}
        >
          {connected ? account : 'Connect Wallet'}
        </Box>
      </>
    </Stack>
  )
}
