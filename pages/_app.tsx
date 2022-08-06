import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { CustomizedSnackbar } from '../components'
import { MetamaskProvider } from '../context'
import { ErrorProvider } from '../context'

const theme = createTheme({
  palette: {
    background: {
      default: '#2D3142'
    },
    primary: {
      main: '#2D3142'
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorProvider>
      <MetamaskProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Head>
            <title>GFT Store</title>
          </Head>
          <Component {...pageProps} />
          <CustomizedSnackbar />
        </ThemeProvider>
      </MetamaskProvider>
    </ErrorProvider>
  )
}

export default MyApp
