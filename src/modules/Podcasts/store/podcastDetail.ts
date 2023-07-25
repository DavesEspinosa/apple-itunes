import { PodcastById } from '@context/AppleItunes/domain/PodcastById'
import { produce } from 'immer'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type PodcastDetailInitialState = {
  podcastDetail: PodcastById | null
  isLoading: boolean
}

export type PodcastDetailStore = PodcastDetailInitialState & {
  setPodcastDetail: (podcast: PodcastById) => void
  setLoading: (value: boolean) => void
}

const initialSettingStore: PodcastDetailInitialState = {
  podcastDetail: null,
  isLoading: false,
}

export const podcastDetailStore = create<PodcastDetailStore>()(
  devtools(
    (set) => ({
      ...initialSettingStore,
      setLoading: (value) =>
        set(
          produce((draft: PodcastDetailStore) => {
            draft.isLoading = value
          }),
          false,
          'setLoading',
        ),
      setPodcastDetail: (podcast) =>
        set(
          produce((draft: PodcastDetailStore) => {
            draft.podcastDetail = podcast
            draft.isLoading = false
          }),
          false,
          'setPodcastDetail',
        ),
    }),
    {
      name: 'PodcastDetailStore',
    },
  ),
)
