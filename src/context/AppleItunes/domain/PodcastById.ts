import { z } from 'zod'
import { DetailPodcastSchema, EpisodeSchema } from './ResponseApiPodcastById'

export const PodcastDetailFeedUrlSchema = z.object({
  description: z.string(),
  episodesLength: z.number(),
})

export const PodcastByIdSchema = PodcastDetailFeedUrlSchema.extend({
  podcast: z.lazy(() => DetailPodcastSchema),
  episodes: z.lazy(() => z.array(EpisodeSchema)),
  timestamp: z.number(),
})

export type PodcastById = z.infer<typeof PodcastByIdSchema>
export type PodcastDetailFeedUrl = z.infer<typeof PodcastDetailFeedUrlSchema>
