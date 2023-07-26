import { podcastDetailStore } from '../store/podcastDetailStore'
import { getAllPodcasts } from 'src/context/AppleItunes/application/getAllPodcasts'
import { getPodcastById } from 'src/context/AppleItunes/application/getPodcastById'
import { isNotOutdated } from 'src/modules/Shared/utils/isNotOutdated'
import { podcastListStore } from '../store/podcastListStore'
import { ResponseEpisode } from 'src/context/AppleItunes/domain/ResponseApiPodcastById'

export const usePodcasts = () => {
  const { setPodcastsList, repository } = podcastListStore()
  const { setPodcastDetail, setLoading } = podcastDetailStore()

  const retrieveAllPodcasts = async ({ limit }: { limit: string }) => {
    if (
      localStorage.getItem('PodcastList') &&
      isNotOutdated(JSON.parse(localStorage.getItem('PodcastList') ?? '').timestamp)
    ) {
      const persistedData = JSON.parse(localStorage.getItem('PodcastList') ?? '')
      setPodcastsList(persistedData)
    } else {
      const allPodcasts = await getAllPodcasts(repository, limit)
      try {
        localStorage.setItem('PodcastList', JSON.stringify(allPodcasts))
      } catch (e) {
        localStorage.clear()
      }
      setPodcastsList(allPodcasts)
    }
  }

  const getPodcastByIdAndEpisodeDetailHook = async ({ id, episodeId }: { id: string; episodeId: string | null }) => {
    setLoading(true)
    try {
      if (localStorage.getItem(id) && isNotOutdated(JSON.parse(localStorage.getItem(id) ?? '').timestamp)) {
        const persistedData = JSON.parse(localStorage.getItem(id) ?? '')
        try {
          localStorage.setItem(
            id,
            JSON.stringify({
              ...persistedData,
              episodeDetail: getEpisode({ episodeId, episodes: persistedData.episodes }),
            }),
          )
        } catch (e) {
          localStorage.clear()
        }
        setPodcastDetail({
          ...persistedData,
          episodeDetail: getEpisode({ episodeId, episodes: persistedData.episodes }),
        })
      } else {
        const { episodes, podcast, timestamp, episodesLength, description } = await getPodcastById(repository, id)

        const detail = {
          episodes: episodes,
          podcast: podcast,
          timestamp: timestamp,
          episodesLength: episodesLength,
          description: description,
          episodeDetail: getEpisode({ episodeId, episodes }),
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
  const getEpisode = ({ episodeId, episodes }: { episodeId: string | null; episodes: Array<ResponseEpisode> }) => {
    let episodeDetail: ResponseEpisode | null
    if (episodeId) {
      episodeDetail = episodes.find((episode) => episode.trackId.toString() === episodeId) ?? null
    } else {
      episodeDetail = null
    }
    return episodeDetail
  }

  return {
    retrieveAllPodcasts,
    getPodcastByIdAndEpisodeDetailHook,
  }
}
