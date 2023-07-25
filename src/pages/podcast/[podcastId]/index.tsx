import { Grid, Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { DefaultLayout } from '@modules/Shared/components/Layouts'
import { PodcastDetail } from '@modules/Podcasts/components/PodcastDetail/PodcastDetail'
import { podcastDetailStore } from '@modules/Podcasts/store/podcastDetail'
import { usePodcasts } from '@modules/Podcasts/hooks/usePodcasts'

export default function PodcastById() {
  const { isLoading } = podcastDetailStore()
  const { getPodcastByIdHook } = usePodcasts()
  const router = useRouter()
  const { podcastId } = router.query

  useEffect(() => {
    if (!podcastId) {
      return
    }
    getPodcastByIdHook(podcastId as string)
  }, [podcastId])

  return isLoading ? (
    <Grid id="container" container columnSpacing={2} columns={12} alignItems="stretch">
      <Grid item md={4}>
        <Skeleton variant="rectangular" width={320} height={440} />
      </Grid>
      <Grid item md={8}>
        <Skeleton variant="rectangular" width={720} height={440} />
      </Grid>
    </Grid>
  ) : (
    <Grid id="container" container columnSpacing={2} columns={12} alignItems="stretch">
      <Grid item md={4}>
        <PodcastDetail />
      </Grid>
      <Grid item md={8}></Grid>
    </Grid>
  )
}

PodcastById.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout title="Podcaster">{page}</DefaultLayout>
}
