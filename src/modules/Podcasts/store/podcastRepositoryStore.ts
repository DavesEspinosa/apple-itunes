import { PodcastRepository } from 'src/context/AppleItunes/domain/PodcastRepository'
import { HttpAppleItunes } from 'src/context/AppleItunes/infrastructure/HttpAppleItunes'
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
