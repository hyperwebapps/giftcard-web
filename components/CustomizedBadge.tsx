import * as React from 'react'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.primary.main}`,
    padding: '0 4px'
  }
}))

export default function CustomizedBadge() {
  return (
    <IconButton aria-label="cart" sx={{ mr: '1rem' }}>
      <StyledBadge badgeContent={2} color="info">
        <ShoppingCartIcon sx={{ color: 'white' }} />
      </StyledBadge>
    </IconButton>
  )
}
