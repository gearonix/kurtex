import { Metadata } from 'next'
import dynamic      from 'next/dynamic'

const HubPage = dynamic(() => import('@/pages/hub').then((mod) => mod.HubPage))

export const metadata: Metadata = {
  title: 'Hub - Kurtex'
}

export default HubPage
