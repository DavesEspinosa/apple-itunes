import { z } from 'zod'

export const PodcastSchema = z.object({
  id: z.string(),
  image: z.string(),
  name: z.string(),
  author: z.string(),
  summary: z.string(),
})

export const PodcastBodySchema = z.object({
  podcasts: z.lazy(() => z.array(PodcastSchema)),
  timestamp: z.number(),
})

export type Podcast = z.infer<typeof PodcastSchema>
export type PodcastBody = z.infer<typeof PodcastBodySchema>
