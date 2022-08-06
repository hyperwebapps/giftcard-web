import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import dinoImage from '../public/dino.png'
import Image from 'next/image'
import { WalletButton } from './WalletButton'
import { Button } from '@mui/material'
import Link from 'next/link'
import HideOnScroll from './HideOnScroll'
import { IDrawerAppBarLink } from './types'
import CustomizedBadge from './CustomizedBadge'

export const DrawerAppBar = () => {
  const textButton: IDrawerAppBarLink[] = [
    {
      text: 'home',
      link: '/'
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
          <Toolbar>
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
            <CustomizedBadge />
            <WalletButton />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Box>
  )
}

export default DrawerAppBar
