import { Grid, Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { PodcastDetail } from 'src/modules/Podcasts/components/PodcastDetail'
import { PodcastEpisodesCount } from 'src/modules/Podcasts/components/PodcastEpisodesCount'
import { PodcastEpisodesTable } from 'src/modules/Podcasts/components/PodcastEpisodesTable'
import { usePodcasts } from 'src/modules/Podcasts/hooks/usePodcasts'
import { podcastDetailStore } from 'src/modules/Podcasts/store/podcastDetail'
import { DefaultLayout } from 'src/modules/Shared/components/Layouts'


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
      <Grid item md={8}>
        <PodcastEpisodesCount />
        <PodcastEpisodesTable />
      </Grid>
    </Grid>
  )
}

PodcastById.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout title="Podcaster">{page}</DefaultLayout>
}
