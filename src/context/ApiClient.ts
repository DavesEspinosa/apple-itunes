import axios, { AxiosInstance } from 'axios'

export type useApiClientType = () => AxiosInstance
export type useApiClientResponseType = ReturnType<useApiClientType>

export const ApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: 'https://itunes.apple.com/us',
  })

  return instance
}
