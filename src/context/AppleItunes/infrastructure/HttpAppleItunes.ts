import { ApiClient } from '@context/ApiClient'
import axios, { AxiosError } from 'axios'
import { Entry } from '../domain/ResponseEntry'
import { PodcastRepository } from '../domain/PodcastRepository'
import { parseString } from 'xml2js'
import Parser from 'rss-parser'
import { PodcastDetailFeedUrl } from '../domain/PodcastById'

const apiClient = ApiClient()

export function HttpAppleItunes(): PodcastRepository {
  return {
    findAll,
    findById,
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

async function findById({ id }: { id: string }) {
  return await apiClient
    .get(`lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`)
    .then(async ({ data }) => {
      const result: any = await findPodcastDescriptionAndEpisodesLength({ url: data.results[0].feedUrl })
      return {
        podcast: data.results[0],
        episodes: data.results.slice(1),
        description: result.description,
        episodesLength: result.episodesLength,
        timestamp: Date.now(),
      }
    })
    .catch((error: AxiosError) => {
      throw new Error(error.message)
    })
}

async function findPodcastDescriptionAndEpisodesLength({ url }: { url: string }) {
  const parser = new Parser()
  try {
    const feed = await parser.parseURL(url)
    const episodesData: PodcastDetailFeedUrl = {
      description: feed.description ?? '',
      episodesLength: feed.items.length ?? '',
    }
    return episodesData
  } catch (error) {
    return await axios(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
      .then(({ data }) => {
        let detail: unknown
        parseString(data.contents, function (___, result: any) {
          detail = {
            description: result.rss?.channel[0]['description'][0],
            episodesLength: result.rss?.channel[0]['item'].length,
          }
        })
        return detail
      })
      .catch((error: AxiosError) => {
        throw new Error(error.message)
      })
  }
}
