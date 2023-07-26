import { useCallback } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Divider, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { podcastDetailStore } from '../../store/podcastDetail'

export const PodcastDetail = ({ isFromEpisode }: { isFromEpisode?: boolean }) => {
  const { podcastDetail } = podcastDetailStore()
  const router = useRouter()
  const { podcastId } = router.query

  const seeDetail = useCallback((podcastId: string) => {
    void router.push(`/podcast/${podcastId}`, undefined, { shallow: true })
  }, [])

  return (
    podcastDetail && (
      <Card
        sx={{ cursor: isFromEpisode ? 'pointer' : 'default' }}
        onClick={isFromEpisode ? () => seeDetail(podcastId as string) : undefined}
      >
        <CardMedia sx={{ height: 340 }} image={podcastDetail.podcast.artworkUrl600} title="green iguana" />
        <CardContent>
          <Stack
            divider={<Divider orientation="horizontal" flexItem />}
            sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}
          >
            <Typography variant="button" fontWeight="bold" component="div">
              {podcastDetail.podcast.trackName}
            </Typography>
            <Typography fontStyle={'oblique'} variant="body2" color="text.secondary">
              {`by ${podcastDetail.podcast.artistName}`}
            </Typography>
            <div
              style={{ height: 265, margin: 10, overflowWrap: 'break-word', overflow: 'auto' }}
              dangerouslySetInnerHTML={{ __html: podcastDetail.description }}
            ></div>
          </Stack>
        </CardContent>
      </Card>
    )
  )
}
