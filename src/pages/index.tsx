import { ReactElement } from 'react'

import { DefaultLayout } from '../modules/Shared/Layouts'

export default function Page() {
  return <>test</>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout title="Podcaster">{page}</DefaultLayout>
}
