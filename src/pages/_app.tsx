'use client'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { StyledEngineProvider } from '@mui/material/styles'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useTheme } from '@emotion/react'
import { HydrationZustand } from '@modules/Shared/hooks/useHydrationZustand'

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps<{}> & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <HydrationZustand>
          <>{getLayout(<Component {...pageProps} />)}</>
        </HydrationZustand>
      </StyledEngineProvider>
    </ThemeProvider>
  )
}
