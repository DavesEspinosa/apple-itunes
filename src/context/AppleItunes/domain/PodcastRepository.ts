import { Podcast } from './Podcast'

export interface PodcastRepository {
  findAll: ({ limit }: { limit: string }) => Promise<Array<Podcast>>
}
