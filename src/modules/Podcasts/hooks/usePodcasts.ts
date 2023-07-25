import { getAllPodcasts } from '@context/AppleItunes/application/getAllPodcasts'
import { persistedPodcastStore } from '../store/persistedPodcastStore'
import { podcastRepositoryStore } from '../store/podcastRepositoryStore'
import { isNotOutdated } from '@modules/Shared/utils/isNotOutdated'
import { podcastDetailStore } from '../store/podcastDetail'
import { getPodcastById } from '@context/AppleItunes/application/getPodcastById'

export const usePodcasts = () => {
  const { setPodcastsList } = persistedPodcastStore()
  const { setPodcastDetail, setLoading } = podcastDetailStore()
  const { repository } = podcastRepositoryStore()

  const retrieveAllPodcasts = async ({ limit }: { limit: string }) => {
    let list
    if (
      localStorage.getItem('PersistedPodcastStore') !== null &&
      JSON.parse(localStorage.getItem('PersistedPodcastStore') ?? '').state.podcastsList.length > 0 &&
      isNotOutdated(JSON?.parse(localStorage.getItem('PersistedPodcastStore') ?? '').state.timestamp)
    ) {
      const persistedData = JSON.parse(localStorage.getItem('PersistedPodcastStore') ?? '')
      list = persistedData.state.podcastsList
    } else {
      list = await getAllPodcasts(repository, limit)
    }
    setPodcastsList(list)
  }

  const getPodcastByIdHook = async (id: string) => {
    setLoading(true)
    try {
      let detail
      if (localStorage.getItem(id) && isNotOutdated(JSON.parse(localStorage.getItem(id) ?? '').timestamp)) {
        const persistedData = JSON.parse(localStorage.getItem(id) ?? '')
        detail = {
          ...persistedData,
        }
        setPodcastDetail(detail)
      } else {
        const { episodes, podcast, timestamp, episodesLength, description } = await getPodcastById(repository, id)
        detail = {
          episodes: episodes,
          podcast: podcast,
          timestamp: timestamp,
          episodesLength: episodesLength,
          description: description,
        }
        try {
          localStorage.setItem(id, JSON.stringify(detail))
        } catch (e) {
          localStorage.clear()
        }
        setPodcastDetail(detail)
      }
    } catch (error) {
      console.log('🚀 ~ file: useItunes.ts:27 ~ getPodcastById ~ error:', error)
    }
  }

  return {
    retrieveAllPodcasts,
    getPodcastByIdHook,
  }
}
