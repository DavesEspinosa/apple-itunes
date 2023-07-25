import { ApiClient } from '@context/ApiClient'
import { AxiosError } from 'axios'
import { Entry } from '../domain/ResponseEntry'
import { PodcastRepository } from '../domain/PodcastRepository'

const apiClient = ApiClient()

export function HttpAppleItunes(): PodcastRepository {
  return {
    findAll,
  }
}
async function findAll({ limit }: { limit: string }) {
  return await apiClient
    .get(`/rss/toppodcasts/limit=${limit}/genre=1310/json`)
    .then(({ data }) => {
      return data.feed.entry.map((entry: Entry) => ({
        id: entry.id.attributes['im:id'],
        image: entry['im:image'][2].label,
        name: entry['im:name'].label,
        author: entry['im:artist'].label,
        summary: entry['summary'].label ?? '-',
      }))
    })
    .catch((error: AxiosError) => {
      throw new Error(error.message)
    })
}
