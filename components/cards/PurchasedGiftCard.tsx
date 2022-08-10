import { Stack, Box, Typography } from '@mui/material'
import React from 'react'
import { IPurchasedGiftCard } from '../types'

export const PurchasedGiftCard = (props: IPurchasedGiftCard) => {
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
        <Typography sx={{ fontWeight: '500', fontSize: '1.3rem' }}>Micheal Jacson</Typography>
        <Typography sx={{ fontWeight: 'light', fontSize: '1.3rem' }}>michealj@gmail.com</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" sx={{ flexWrap: 'wrap', mt: '1rem', color: 'white' }}>
        <Typography sx={{ fontWeight: '500', fontSize: '1.3rem' }}>{props.timestamp}</Typography>
        <Typography sx={{ fontWeight: 'light', fontSize: '1.3rem' }}>${props.price}</Typography>
      </Stack>
    </Box>
  )
}
