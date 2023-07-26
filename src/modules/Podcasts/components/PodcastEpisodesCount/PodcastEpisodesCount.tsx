import Typography from '@mui/material/Typography'
import { Paper } from '@mui/material'
import { podcastDetailStore } from '../../store/podcastDetailStore'

export const PodcastEpisodesCount = () => {
  const { podcastDetail } = podcastDetailStore()

  return (
    podcastDetail && (
      <Paper elevation={3}>
        <Typography px={2} variant="h2" fontWeight="bold" component="div">
          {`Episodes: ${podcastDetail?.episodesLength}`}
        </Typography>
      </Paper>
    )
  )
}
