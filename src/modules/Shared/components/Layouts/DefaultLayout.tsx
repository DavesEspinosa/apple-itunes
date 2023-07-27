import { Grid, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { Header } from 'src/modules/Podcasts/components/Header'
import * as useWindowSize from '../../hooks/useWindowSize'
import { globalStore } from '../../store/globalStore'

type DefaultLayoutProps = {
  children: ReactElement
  title: string
  pageTitle?: string
  headerRightContent?: ReactElement
  breadcrumbs?: ReactElement
}
export const DefaultLayout = ({ children, title, pageTitle, headerRightContent, breadcrumbs }: DefaultLayoutProps) => {
  const router = useRouter()
  const { setHeight } = globalStore()
  const size = useWindowSize.useWindowSize('container')

  useEffect(() => {
    if (size.height === 0) return
    setHeight(size.height)
  }, [setHeight, size.height])

  const header = (
    <Grid container alignItems="start" justifyContent="space-between">
      <Grid item>
        <Typography
          fontWeight={'bold'}
          sx={{ cursor: 'pointer' }}
          onClick={() => router.replace('/', undefined, { shallow: true })}
          variant="h5"
        >
          {pageTitle ? pageTitle : title}
        </Typography>
        {breadcrumbs}
      </Grid>
      <Grid item>
        <Stack direction="row" spacing={2} alignItems={'center'}>
          {headerRightContent}
        </Stack>
      </Grid>
    </Grid>
  )

  return (
    <Header title={title} header={header}>
      {children}
    </Header>
  )
}
