import { Podcast } from '@context/AppleItunes/domain/Podcast'
import { produce } from 'immer'
import { create } from 'zustand'

import { devtools, persist } from 'zustand/middleware'

export type PersistedPodcastStoreInitialState = {
  podcastsList: Array<Podcast> | []
  timestamp: number
  filteredPodcastsList: Array<Podcast> | []
}

export type PersistedPodcastStore = PersistedPodcastStoreInitialState & {
  setPodcastsList: (podcastsList: Array<Podcast>) => void
  setSearchPodcasts: (query: string | null) => void
}

const initialSettingStore: PersistedPodcastStoreInitialState = {
  podcastsList: [],
  filteredPodcastsList: [],
  timestamp: Date.now(),
}

export const persistedPodcastStore = create<PersistedPodcastStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialSettingStore,
        setPodcastsList: (podcastsList) =>
          set(
            produce((draft: PersistedPodcastStore) => {
              draft.podcastsList = podcastsList
              draft.filteredPodcastsList = podcastsList
            }),
            false,
            'setPodcastsList',
          ),

        setSearchPodcasts: (query) =>
          set(
            produce((draft: PersistedPodcastStore) => {
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
        name: 'PersistedPodcastStore',
      },
    ),
  ),
)
