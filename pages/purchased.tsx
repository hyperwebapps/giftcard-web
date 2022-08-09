import { Stack, Box, Toolbar, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { DrawerAppBar } from '../components'

const Exchange: NextPage = () => {
  return (
    <Box>
      <DrawerAppBar />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Stack direction="row" justifyContent="center" sx={{ color: 'white' }}>
          No cards found
        </Stack>
      </Box>
    </Box>
  )
}

export default Exchange
