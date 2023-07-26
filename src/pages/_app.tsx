'use client'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { StyledEngineProvider } from '@mui/material/styles'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useTheme } from '@emotion/react'
import { HydrationZustand } from '@modules/Shared/hooks/useHydrationZustand'
import { useRouter } from 'next/router'
import { LoadingBarRoutes } from '@modules/Shared/components/LoadingBarRoutes'

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps<{}> & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => setLoading(true)
    const handleRouteComplete = () => setLoading(false)

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <LoadingBarRoutes loading={loading} />
        <HydrationZustand>
          <>{getLayout(<Component {...pageProps} />)}</>
        </HydrationZustand>
      </StyledEngineProvider>
    </ThemeProvider>
  )
}
