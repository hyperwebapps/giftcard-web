import { Stack, Box, Fab, Typography } from '@mui/material'
import EastIcon from '@mui/icons-material/East'
import React from 'react'
import { IStoreGiftCard } from '../types'
import useError from '../../context/error/ErrorContext'
import useMetamask from '../../context/metamask/MetamaskContext'
import { Contract } from 'ethers'
import { contractAddress, GiftCardAbi } from '../../utils'
import { addGiftCardCode } from '../../http'

export const StoreGiftCard = (props: IStoreGiftCard) => {
  const { provider } = useMetamask()
  const { throwError } = useError()

  const buyGiftcard = async () => {
    try {
      if (provider !== undefined) {
        const contract = new Contract(contractAddress, GiftCardAbi, provider)
        await contract.connect(provider.getSigner()).callStatic.buyCard(props.id)
        const transaction = await contract.connect(provider.getSigner()).functions.buyCard(props.id)
        await transaction.wait()
        await addGiftCardCode(await provider.getSigner().getAddress(), props.id)
      }
    } catch (error: any) {
      throwError(error.errorName || error.message)
    }
  }

  return (
    <Box sx={{ mb: '1.5rem' }}>
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{
          width: '390px',
          height: '230px',
          backgroundImage: `url(http://127.0.0.1:8080/ipfs/${props.imageHash})`,
          backgroundSize: 'cover',
          borderRadius: '1.3rem',
          resize: 'both'
        }}
      />
      <Stack direction="row" justifyContent="space-between" sx={{ flexWrap: 'wrap', mt: '1rem', color: 'white' }}>
        <Typography sx={{ fontWeight: '500', fontSize: '1.3rem' }}>{props.text}</Typography>
        <Typography sx={{ fontWeight: 'light', fontSize: '1.3rem' }}>${props.price}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" sx={{ flexWrap: 'wrap', mt: '0.5rem' }}>
        <Fab variant="extended" size="medium" color="info" sx={{ boxShadow: 1 }} onClick={buyGiftcard}>
          Buy Now
          <EastIcon sx={{ ml: 1 }} />
        </Fab>
      </Stack>
    </Box>
  )
}
