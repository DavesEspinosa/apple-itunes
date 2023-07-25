import { PodcastRepository } from '../domain/POdcastRepository'

export const getPodcastById = (repository: PodcastRepository, id: string) => {
  return repository.findById({ id })
}
