import { Stack, Box, Toolbar } from '@mui/material'
import { BigNumber, Contract, ethers } from 'ethers'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { DrawerAppBar, IStoreGiftCard } from '../components'
import { StoreGiftCard } from '../components/cards/StoreGiftCard'
import { cardText, contractAddress, GiftCardAbi } from '../utils'

const Home: NextPage = () => {
  const [cards, setCards] = useState<IStoreGiftCard[]>([])

  useEffect(() => {
    const getCards = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new Contract(contractAddress, GiftCardAbi, provider)
      const cardSize = BigNumber.from(await contract.cardSize()).toNumber()

      if (cardSize > 0) {
        let cardArray = []
        for (let i = 0; i < cardSize; i++) {
          const card = await contract.cards(i)
          const updatedCards = {
            id: i,
            imageHash: card.imageHash,
            price: BigNumber.from(card.price).toString(),
            text: cardText[card.store],
            isInCart: BigNumber.from(card.price).toNumber() > 30
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
          {cards.length > 0 ? cards.map((item, index) => <StoreGiftCard {...item} key={index} />) : 'No cards have been added'}
        </Stack>
      </Box>
    </Box>
  )
}

export default Home
