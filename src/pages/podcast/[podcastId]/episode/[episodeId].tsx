import { Grid, Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { PodcastDetail } from 'src/modules/Podcasts/components/PodcastDetail'
import { PodcastEpisodeDetail } from 'src/modules/Podcasts/components/PodcastEpisodeDetail'
import { usePodcasts } from 'src/modules/Podcasts/hooks/usePodcasts'
import { podcastDetailStore } from 'src/modules/Podcasts/store/podcastDetailStore'
import { DefaultLayout } from 'src/modules/Shared/components/Layouts'

export default function EpisodeById() {
  const { isLoading, podcastDetail } = podcastDetailStore()
  const { getPodcastByIdAndEpisodeDetailHook } = usePodcasts()
  const router = useRouter()

  const { podcastId, episodeId } = router.query
  
  useEffect(() => {
    if (!podcastId && !episodeId) {
      return
    }
    getPodcastByIdAndEpisodeDetailHook({ id: podcastId as string, episodeId: episodeId as string })
  }, [podcastId, episodeId])

  return isLoading && !podcastDetail ? (
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
        <PodcastDetail isFromEpisode={true} />
      </Grid>
      <Grid item md={8}>
        <PodcastEpisodeDetail />
      </Grid>
    </Grid>
  )
}

EpisodeById.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout title="Podcaster">{page}</DefaultLayout>
}
