import { produce } from 'immer'
import { PodcastRepository } from 'src/context/AppleItunes/domain/PodcastRepository'
import { Podcast, PodcastBody } from 'src/context/AppleItunes/domain/PodcastSchema'
import { HttpAppleItunes } from 'src/context/AppleItunes/infrastructure/HttpAppleItunes'
import { create } from 'zustand'

import { devtools } from 'zustand/middleware'
const repository = HttpAppleItunes()

export type PodcastListStoreInitialState = {
  repository: PodcastRepository
  podcastsList: Array<Podcast> | []
  timestamp: number
  filteredPodcastsList: Array<Podcast> | []
}

export type PodcastListStore = PodcastListStoreInitialState & {
  setPodcastsList: (podcastBody: PodcastBody) => void
  setSearchPodcasts: (query: string | null) => void
}

const initialPodcastListStore: PodcastListStoreInitialState = {
  repository: repository,
  podcastsList: [],
  filteredPodcastsList: [],
  timestamp: 0,
}

export const podcastListStore = create<PodcastListStore>()(
  devtools(
    (set) => ({
      ...initialPodcastListStore,
      setPodcastsList: (podcastBody) =>
        set(
          produce((draft: PodcastListStore) => {
            draft.podcastsList = podcastBody.podcasts
            draft.filteredPodcastsList = podcastBody.podcasts
            draft.timestamp = podcastBody.timestamp
          }),
          false,
          'setPodcastsList',
        ),

      setSearchPodcasts: (query) =>
        set(
          produce((draft: PodcastListStore) => {
            let filtered: Array<Podcast> | []
            if (query) {
              filtered = draft.podcastsList?.filter(
                (podcast: Podcast) =>
                  podcast.name.toLowerCase().includes(query.toLowerCase()) ||
                  podcast.author.toLowerCase().includes(query.toLowerCase()),
              )
            } else {
              filtered = draft.podcastsList
            }
            draft.filteredPodcastsList = filtered
          }),
          false,
          'setSearchPodcasts',
        ),
    }),
    {
      name: 'PodcastListStore',
    },
  ),
)
