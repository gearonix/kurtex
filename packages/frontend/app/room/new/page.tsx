import { Metadata } from 'next'
import dynamic      from 'next/dynamic'

const RoomPage = dynamic(() =>
  import('@/pages/room/page').then((mod) => mod.RoomPage))

export const metadata: Metadata = {
  title: 'Room - Kurtex'
}

export const NewRoomPage = () => {
  return <RoomPage createRoom={true} />
}

export default NewRoomPage
