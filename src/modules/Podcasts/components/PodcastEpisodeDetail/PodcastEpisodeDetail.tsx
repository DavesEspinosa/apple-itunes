import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Divider, Stack, Typography } from '@mui/material'
import { podcastDetailStore } from '../../store/podcastDetailStore'

export const PodcastEpisodeDetail = () => {
  const { isLoading, podcastDetail } = podcastDetailStore()

  return (
    !isLoading &&
    podcastDetail?.episodeDetail && (
      <Card>
        <CardContent>
          <Stack
            divider={<Divider orientation="horizontal" flexItem />}
            sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}
          >
            <Typography variant="button" fontWeight="bold" component="div">
              {podcastDetail.episodeDetail.trackName}
            </Typography>
            <div
              style={{ margin: 10, overflowWrap: 'break-word' }}
              dangerouslySetInnerHTML={{ __html: podcastDetail.episodeDetail.description }}
            ></div>
            <Stack mt={2} justifySelf={'center'}>
              <div>
                <audio controls>
                  <source src={podcastDetail.episodeDetail.previewUrl} type="audio/ogg" />
                  <source src={podcastDetail.episodeDetail.previewUrl} type="audio/mpeg" />
                  <source src={podcastDetail.episodeDetail.previewUrl} type="audio/mp3" />
                </audio>
              </div>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    )
  )
}
