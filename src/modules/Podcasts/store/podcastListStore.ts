import { PodcastRepository } from '@context/AppleItunes/domain/PodcastRepository'
import { Podcast } from '@context/AppleItunes/domain/Podcast'
import { HttpAppleItunes } from '@context/AppleItunes/infrastructure/HttpAppleItunes'
import { produce } from 'immer'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
const repository = HttpAppleItunes()

export type PodcastListInitialState = {
  repository: PodcastRepository
  podcastsList: Array<Podcast> | []
  filteredPodcastsList: Array<Podcast> | []
}

export type PodcastListStore = PodcastListInitialState & {
  setPodcastsList: (podcastsList: Array<Podcast>) => void
  setSearchPodcasts: (query: string | null) => void
}

const initialSettingStore: PodcastListInitialState = {
  repository: repository,
  podcastsList: [],
  filteredPodcastsList: [],
}

export const podcastListStore = create<PodcastListStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialSettingStore,

        setPodcastsList: (podcastsList) =>
          set(
            produce((draft: PodcastListStore) => {
              draft.podcastsList = podcastsList
              draft.filteredPodcastsList = podcastsList
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
  ),
)
