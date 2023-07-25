import { PodcastRepository } from "../domain/PodcastRepository"

export const getAllPodcasts = (repository: PodcastRepository, limit: string) => {
  return repository.findAll({ limit })
}
