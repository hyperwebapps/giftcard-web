import { Stack, Box, Toolbar } from '@mui/material'
import { Contract } from 'ethers'
import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { DrawerAppBar, IBlockchainGiftCard, IPurchasedGiftCard } from '../components'
import { PurchasedGiftCard } from '../components/cards/PurchasedGiftCard'
import useMetamask from '../context/metamask/MetamaskContext'
import { getUserCards } from '../http'
import { contractAddress, GiftCardAbi, cardText, convertToDate } from '../utils'

const Exchange: NextPage = () => {
  const { connected, provider } = useMetamask()

  const [cards, setCards] = useState<IPurchasedGiftCard[]>([])

  useEffect(() => {
    const getCards = async () => {
      if (provider !== undefined) {
        const contract = new Contract(contractAddress, GiftCardAbi, provider)
        const userCards = await getUserCards(await provider.getSigner().getAddress())

        if (userCards.length > 0) {
          let cardArray = []
          for (let i = 0; i < userCards.length; i++) {
            const {
              code,
              card: { id, timestamp }
            } = userCards[i]
            const giftcard: IBlockchainGiftCard = await contract.cards(id)
            const updatedCards = {
              id,
              code,
              imageHash: giftcard.imageHash,
              price: giftcard.price.toString(),
              text: cardText[giftcard.store],
              timestamp: convertToDate(timestamp)
            }
            cardArray.push(updatedCards)
          }
          setCards(cardArray)
        }
      }
    }

    getCards()
  }, [provider])

  return (
    <Box>
      <DrawerAppBar />
      <Box component="main" sx={{ p: 3, color: 'white' }}>
        <Toolbar />
        <Stack direction="row" justifyContent="space-evenly" sx={{ flexWrap: 'wrap' }}>
          {connected && cards.length > 0
            ? cards.map((card, index) => <PurchasedGiftCard {...card} key={index} />)
            : 'No cards have been bought'}
        </Stack>
      </Box>
    </Box>
  )
}

export default Exchange
