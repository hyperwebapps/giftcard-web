import { Stack, Box, Toolbar } from '@mui/material'
import type { NextPage } from 'next'
import { DrawerAppBar, ExchangeBox } from '../components'

const Exchange: NextPage = () => {
  return (
    <Box>
      <DrawerAppBar />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Stack direction="row" justifyContent="center">
          <ExchangeBox />
        </Stack>
      </Box>
    </Box>
  )
}

export default Exchange
