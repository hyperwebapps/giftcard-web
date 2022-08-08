import { Stack, Box, Toolbar } from '@mui/material'
import type { NextPage } from 'next'
import { DrawerAppBar, IStoreGiftCard } from '../components'
import { StoreGiftCard } from '../components/cards/StoreGiftCard'

const Home: NextPage = () => {
  const giftcardAvailable: IStoreGiftCard[] = [
    {
      id: 0,
      imageHash: 'QmZjKYG4rhtVzZHnyLRNSVofzYFxvRE2wvex5D9ByZ6SDa',
      text: 'Apple - Email Delivery',
      price: '25',
      isInCart: true
    },
    {
      id: 1,
      imageHash: 'QmUNnVyuc5KtTzWNhvo9doQEyUgFWR1s68gsrjFvAfU91j',
      text: 'Google Play Gift Code',
      price: '30',
      isInCart: false
    },
    {
      id: 2,
      imageHash: 'QmUNnVyuc5KtTzWNhvo9doQEyUgFWR1s68gsrjFvAfU91j',
      text: 'Google Play Gift Code',
      price: '10',
      isInCart: false
    },
    {
      id: 3,
      imageHash: 'QmZjKYG4rhtVzZHnyLRNSVofzYFxvRE2wvex5D9ByZ6SDa',
      text: 'Apple - Email Delivery',
      price: '50',
      isInCart: true
    }
  ]

  return (
    <Box>
      <DrawerAppBar />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Stack direction="row" justifyContent="space-evenly" sx={{ flexWrap: 'wrap' }}>
          {giftcardAvailable.map(item => (
            <StoreGiftCard {...item} key={item.id} />
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default Home
