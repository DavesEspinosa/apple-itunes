import { z } from 'zod'

export const PodcastSchema = z.object({
  id: z.string(),
  image: z.string(),
  name: z.string(),
  author: z.string(),
  summary: z.string(),
})

export type Podcast = z.infer<typeof PodcastSchema>
