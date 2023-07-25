import { Podcast } from './Podcast'
import { PodcastById } from './PodcastById'

export interface PodcastRepository {
  findAll: ({ limit }: { limit: string }) => Promise<Array<Podcast>>
  findById: ({ id }: { id: string }) => Promise<PodcastById>
}
