import { PodcastById } from './PodcastById'
import { PodcastBody } from './PodcastSchema'

export interface PodcastRepository {
  findAll: ({ limit }: { limit: string }) => Promise<PodcastBody>
  findById: ({ id }: { id: string }) => Promise<PodcastById>
}
