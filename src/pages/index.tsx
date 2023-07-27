import { ReactElement } from 'react'

import { DefaultLayout } from '../modules/Shared/components/Layouts'
import { PodcastsList } from 'src/modules/Podcasts/components/PodcastsList'
import { Grid } from '@mui/material'
import { globalStore } from 'src/modules/Shared/store/globalStore'

export default function Page() {
  const { height } = globalStore()

  return (
    <Grid
      id="container"
      container
      gap={2}
      columns={12}
      justifyContent={'stretch'}
      sx={{
        height: height as number - 40,
      }}
    >
      <PodcastsList />
    </Grid>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout title="Podcaster">{page}</DefaultLayout>
}
