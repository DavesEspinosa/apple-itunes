import { ReactElement } from 'react'

import { DefaultLayout } from '../modules/Shared/Layouts'
import { PodcastsList } from '@modules/Podcasts/components/PodcastsList'

export default function Page() {
  return <PodcastsList />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout title="Podcaster">{page}</DefaultLayout>
}
