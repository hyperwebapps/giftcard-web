import { Box, Stack } from '@mui/material'
import { BigNumber, ethers } from 'ethers'
import React, { useState } from 'react'
import useMetamask from '../context/metamask/MetamaskContext'
import { contractAddress, isSufficientBalance } from '../utils'
import { GiftCardAbi } from '../utils'
import useError from '../context/error/ErrorContext'

export const ExchangeBox = () => {
  const { throwError } = useError()
  const { connected, balance, updateTokenBalance, token, provider } = useMetamask()
  const [codes] = useState([8, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57])
  const [tokenAmount, setTokenAmount] = useState('')

  const exchange = async () => {
    try {
      const providerConverted = provider as ethers.providers.Web3Provider
      const tokenWei = BigNumber.from((parseInt(tokenAmount) * 1e15).toString())
      const contract = new ethers.Contract(contractAddress, GiftCardAbi, provider)
      const tx = await contract.connect(providerConverted.getSigner()).functions.exchange(tokenAmount, { value: tokenWei })
      await tx.wait()
      updateTokenBalance()
    } catch (error: any) {
      throwError(error.message)
    }
  }

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      sx={{
        flexWrap: 'wrap',
        width: '480px',
        bgcolor: '#4F5D75',
        borderRadius: '1rem',
        boxShadow: 2,
        color: 'white'
      }}
    >
      <Box sx={{ my: '1rem', mx: '1rem' }}>Exchange</Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{
          width: '100%',
          mx: '0.5rem',
          pt: '0.3rem',
          pb: '2rem',
          bgcolor: '#2D3142',
          borderRadius: '0.9rem'
        }}
      >
        <Box
          component="input"
          sx={{
            m: '0.6rem 1rem',
            width: '50%',
            bgcolor: 'transparent',
            border: '0px solid',
            outline: 'none',
            fontSize: '1.5rem',
            color: 'white'
          }}
          onKeyDown={(event: any) => {
            if (!codes.includes(event.keyCode)) {
              event.preventDefault()
            }
          }}
          onChange={(event: any) => {
            setTokenAmount(event.target.value)
          }}
          value={tokenAmount}
          placeholder="0.0"
        />
        <Box sx={{ m: '0.6rem 1.5rem' }}>Token: {token}</Box>
      </Stack>
      <Stack
        component="button"
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: '100%',
          color: 'inherit',
          m: '0.7rem 0.5rem 0.6rem 0.5rem',
          p: '0.9rem',
          border: '0px solid',
          bgcolor: '#EF8354',
          borderRadius: '0.8rem',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
        onClick={() => exchange()}
        disabled={!connected || !isSufficientBalance(balance, tokenAmount)}
      >
        {connected ? (isSufficientBalance(balance, tokenAmount) ? 'Exchange' : 'Insufficient Balance') : 'Connect Wallet'}
      </Stack>
    </Stack>
  )
}
