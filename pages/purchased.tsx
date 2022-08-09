import { Stack, Box, Toolbar, Typography } from '@mui/material'
import { ethers, Contract, BigNumber } from 'ethers'
import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { DrawerAppBar, IPurchasedGiftCard } from '../components'
import { PurchasedGiftCard } from '../components/cards/PurchasedGiftCard'
import useMetamask from '../context/metamask/MetamaskContext'
import { contractAddress, GiftCardAbi, cardText, convertToDate, convertToNumber } from '../utils'

const Exchange: NextPage = () => {
  const { connected } = useMetamask()

  const [cards, setCards] = useState<IPurchasedGiftCard[]>([])

  useEffect(() => {
    const getCards = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new Contract(contractAddress, GiftCardAbi, provider)
      const userCards: Array<any> = await contract.connect(provider.getSigner()).getUserCards()

      if (userCards.length > 0) {
        let cardArray = []
        for (let i = 0; i < userCards.length; i++) {
          const { cardId, timestamp } = userCards[i]
          const card = await contract.cards(convertToNumber(cardId))
          const updatedCards = {
            id: convertToNumber(cardId),
            imageHash: card.imageHash,
            price: BigNumber.from(card.price).toString(),
            text: cardText[card.store],
            timestamp: convertToDate(timestamp)
          }
          cardArray.push(updatedCards)
        }
        setCards(cardArray)
      }
    }

    getCards()
  }, [])

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
