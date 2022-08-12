import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import dinoImage from '../public/dino.png'
import Image from 'next/image'
import { WalletButton } from './WalletButton'
import { Button } from '@mui/material'
import Link from 'next/link'
import HideOnScroll from './HideOnScroll'
import { IDrawerAppBarLink } from './types'

export const DrawerAppBar = () => {
  const textButton: IDrawerAppBarLink[] = [
    {
      text: 'home',
      link: '/'
    },
    {
      text: 'purchased',
      link: '/purchased'
    },
    {
      text: 'exchange',
      link: '/exchange'
    }
  ]

  return (
    <Box sx={{ display: 'flex', m: '0.5rem' }}>
      <HideOnScroll>
        <AppBar component="nav" elevation={0}>
          <Box
            sx={{
              mx: 3,
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              color: '#ffffff',
              height: 64,
              position: 'relative'
            }}
          >
            <Box sx={{ flexGrow: 1, display: 'block' }}>
              <Image width={48} height={48} src={dinoImage} alt="no icon" />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {textButton.map((item, index) => (
                <Link href={item.link} key={index}>
                  <Button variant="text" sx={{ color: 'white', mt: '0.2rem', mr: '1rem' }}>
                    {item.text}
                  </Button>
                </Link>
              ))}
            </Box>
            {/* <CustomizedBadge /> */}
            <WalletButton />
          </Box>
        </AppBar>
      </HideOnScroll>
    </Box>
  )
}

export default DrawerAppBar
