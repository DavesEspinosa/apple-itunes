import { z } from 'zod'
import { DetailPodcastSchema, EpisodeSchema } from './ResponseApiPodcastById'

export const PodcastByIdSchema = z.object({
  podcast: z.lazy(() => DetailPodcastSchema),
  episodes: z.lazy(() => z.array(EpisodeSchema)),
})

export type PodcastById = z.infer<typeof PodcastByIdSchema>
