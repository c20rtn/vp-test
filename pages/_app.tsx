import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { store } from '../config/redux/store'

const queryClient = new QueryClient()

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "gray.100",
      }
    })
  },
  fonts: {
    body: `'Helvetica', sans-serif`,
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
