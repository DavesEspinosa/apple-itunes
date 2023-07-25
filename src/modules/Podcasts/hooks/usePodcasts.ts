import { podcastListStore } from '../store/podcastListStore'
import { getAllPodcasts } from '@context/AppleItunes/application/getAllPodcasts'


export const usePodcasts = () => {
  const { setPodcastsList, repository } = podcastListStore()

  const retrieveAllPodcasts = async ({ limit }: { limit: string }) => {
    const persistedData = JSON?.parse(localStorage.getItem('PodcastListStore') ?? '')
    let list
    if (persistedData && persistedData.state.podcastsList.length > 0) {
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
