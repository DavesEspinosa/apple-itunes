import { PodcastRepository } from '@context/AppleItunes/domain/POdcastRepository'
import { HttpAppleItunes } from '@context/AppleItunes/infrastructure/HttpAppleItunes'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
const repository = HttpAppleItunes()

export type PodcastRepositoryInitialState = {
  repository: PodcastRepository
}

const initialSettingStore: PodcastRepositoryInitialState = {
  repository: repository,
}

export const podcastRepositoryStore = create<PodcastRepositoryInitialState>()(
  devtools(
    () => ({
      ...initialSettingStore,
    }),
    {
      name: 'PodcastRepository',
    },
  ),
)
