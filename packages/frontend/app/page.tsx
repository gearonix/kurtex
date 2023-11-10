import { Metadata } from 'next'
import dynamic      from 'next/dynamic'

const MainPage = dynamic(() =>
  import('@/pages/main/main.page').then((mod) => mod.MainPage))

export const metadata: Metadata = {
  title: 'Kurtex'
}

export default MainPage
