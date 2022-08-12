import { Stack, Box, Typography, Fab } from '@mui/material'
import React, { useState } from 'react'
import { IPurchasedGiftCard } from '../types'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export const PurchasedGiftCard = (props: IPurchasedGiftCard) => {
  const [revealCode, setRevealCoder] = useState<boolean>(false)

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
        <Typography sx={{ fontWeight: '500', fontSize: '1.3rem' }}>Giftcard Code:</Typography>
        <Typography component="div" sx={{ fontWeight: 'light', fontSize: '1.3rem' }}>
          {revealCode ? (
            <Stack direction="row" justifyContent="flex-end" alignContent="flex-end">
              {props.code}
              <VisibilityOffIcon sx={{ fontSize: 20, marginTop: 0.8, marginLeft: 1 }} onClick={() => setRevealCoder(!revealCode)} />
            </Stack>
          ) : (
            <Fab variant="extended" size="medium" color="info" sx={{ boxShadow: 0 }} onClick={() => setRevealCoder(!revealCode)}>
              Click to reveal
            </Fab>
          )}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" sx={{ flexWrap: 'wrap', mt: '0.5rem', color: 'white' }}>
        <Typography sx={{ fontWeight: '500', fontSize: '1.3rem' }}>{props.timestamp}</Typography>
        <Typography sx={{ fontWeight: 'light', fontSize: '1.3rem' }}>${props.price}</Typography>
      </Stack>
    </Box>
  )
}
