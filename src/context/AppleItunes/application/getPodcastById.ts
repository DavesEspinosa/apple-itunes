import { PodcastRepository } from '../domain/PodcastRepository'

export const getPodcastById = (repository: PodcastRepository, id: string) => {
  return repository.findById({ id })
}
