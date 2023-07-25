import { Chip, Grid, Stack, Typography } from '@mui/material'
import { SearchInput } from '@modules/Shared/SearchInput/SearchInput'
import { useEffect } from 'react'
import { usePodcasts } from '@modules/Podcasts/hooks/usePodcasts'
import { podcastListStore } from '@modules/Podcasts/store/podcastListStore'
import { PodcastCard } from '../PodcastCard'
import useStore from '@modules/Podcasts/hooks/useStore'

export const PodcastsList = () => {
  const filteredPodcastsList = useStore(podcastListStore, (state) => state.filteredPodcastsList)

  const { setSearchPodcasts } = podcastListStore()
  const { retrieveAllPodcasts } = usePodcasts()

  useEffect(() => {
    return () => {
      retrieveAllPodcasts({ limit: '100' })
    }
  }, [])

  return (
    <Grid id="container" container gap={2} columns={14} justifyContent={'flex-end'}>
      <Grid item>
        {filteredPodcastsList && (
          <Stack direction="row" spacing={1} alignItems={'center'}>
            <Chip
              label={
                <Typography variant="button" fontWeight="bold" component="div">
                  {filteredPodcastsList?.length}
                </Typography>
              }
              color="primary"
              variant="outlined"
            />
            <SearchInput delay={0} placeHolder={'Filter podcasts...'} setDebounceValue={setSearchPodcasts} />
          </Stack>
        )}
      </Grid>
      <Grid id="container" container gap={2} columns={14} justifyContent={'center'}>
        {filteredPodcastsList?.map((podcast) => (
          <Grid key={podcast.id} item xs={3}>
            <PodcastCard podcast={podcast} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
