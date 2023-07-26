import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { ResponseEpisode } from '@context/AppleItunes/domain/ResponseApiPodcastById'
import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import { podcastDetailStore } from '@modules/Podcasts/store/podcastDetail'

interface Column {
  id: 'trackName' | 'releaseDate' | 'trackTimeMillis'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

export const PodcastEpisodesTable = () => {
  const { isLoading, podcastDetail } = podcastDetailStore()

  const router = useRouter()
  const { podcastId } = router.query

  const episodeDetail = useCallback(async (episode: ResponseEpisode, podcastId: string) => {
    void router.push(`/podcast/${podcastId}/episode/${episode.trackId}`, undefined, { shallow: true })
  }, [])

  const columns: readonly Column[] = [
    { id: 'trackName', label: 'Title', minWidth: 170 },
    {
      id: 'releaseDate',
      label: 'Date',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'trackTimeMillis',
      label: 'Duration',
      minWidth: 170,
      align: 'right',
      format: (value: number) => DateTime.fromMillis(value).toFormat('mm:ss'),
    },
  ]
  return (
    !isLoading &&
    podcastDetail && (
      <Grid md={12} item>
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {podcastDetail.episodes.map((episode) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={uuidv4()}>
                    {columns.map((column) => {
                      let value = episode[column.id]

                      return (
                        <TableCell
                          sx={{ cursor: 'pointer' }}
                          onClick={() => episodeDetail(episode, podcastId as string)}
                          key={column.id}
                          align={column.align}
                        >
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    )
  )
}