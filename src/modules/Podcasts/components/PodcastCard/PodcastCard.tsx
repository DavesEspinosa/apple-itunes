import { useCallback } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Podcast } from '@context/AppleItunes/domain/Podcast'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'

export const PodcastCard = ({ podcast }: { podcast: Podcast }) => {
  const router = useRouter()

  const seeDetail = useCallback((id: string) => {
    void router.push(`/podcast/${id}`, undefined, { shallow: true })
  }, [])

  return (
    <Card onClick={() => seeDetail(podcast.id)} sx={{ maxWidth: 250, cursor: 'pointer' }}>
      <CardMedia sx={{ height: 140 }} image={podcast.image} title="green iguana" />
      <CardContent>
        <Stack sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
          <Typography variant="body1" fontWeight="bold" component="div">
            {podcast.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {`Autor: ${podcast.author}`}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
