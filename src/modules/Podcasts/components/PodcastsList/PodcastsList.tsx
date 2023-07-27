import { Box, Chip, Grid, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { PodcastCard } from '../PodcastCard'
import { SearchInput } from 'src/modules/Shared/components/SearchInput'
import { usePodcasts } from '../../hooks/usePodcasts'
import { podcastListStore } from '../../store/podcastListStore'

export const PodcastsList = () => {
  const { setSearchPodcasts, filteredPodcastsList } = podcastListStore()
  const { retrieveAllPodcasts } = usePodcasts()

  useEffect(() => {
    retrieveAllPodcasts({ limit: '100' })
  }, [])

  return (
    <>
      <Grid xs={12} item>
        {filteredPodcastsList && (
          <Stack direction="row" spacing={1} justifyContent={'flex-end'} alignItems={'center'}>
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
      <Grid
        sx={{
          p: 2,
          borderRadius: 2,
          height: '100%',
          overflow: 'auto',
        }}
        justifyContent={'center'}
        xs={12}
        item
      >
        <Grid id="container" container gap={2} columns={14} justifyContent={'center'}>
          {filteredPodcastsList?.map((podcast) => (
            <Grid key={podcast.id} item xs={3}>
              <PodcastCard podcast={podcast} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  )
}
