import { getAllPodcasts } from '@context/AppleItunes/application/getAllPodcasts'
import { persistedPodcastStore } from '../store/persistedPodcastStore'
import { podcastRepositoryStore } from '../store/podcastRepositoryStore'
import { isNotOutdated } from '@modules/Shared/utils/isNotOutdated'

export const usePodcasts = () => {
  const { setPodcastsList } = persistedPodcastStore()
  const { repository } = podcastRepositoryStore()

  const retrieveAllPodcasts = async ({ limit }: { limit: string }) => {
    let list
    if (
      JSON.parse(localStorage.getItem('PersistedPodcastStore') ?? '') &&
      JSON.parse(localStorage.getItem('PersistedPodcastStore') ?? '').state.podcastsList.length > 0 &&
      isNotOutdated(JSON?.parse(localStorage.getItem('PersistedPodcastStore') ?? '').state.timeStamp)
    ) {
      const persistedData = JSON.parse(localStorage.getItem('PersistedPodcastStore') ?? '')
      list = persistedData.state.podcastsList
    } else {
      list = await getAllPodcasts(repository, limit)
    }
    setPodcastsList(list)
  }

  return {
    retrieveAllPodcasts,
  }
}
