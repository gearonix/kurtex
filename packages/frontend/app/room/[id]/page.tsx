import { Metadata } from 'next'
import dynamic      from 'next/dynamic'

const RoomPage = dynamic(() =>
  import('@/pages/room').then((mod) => mod.RoomPage))

export const metadata: Metadata = {
  title: 'Room - Kurtex'
}

export default RoomPage
