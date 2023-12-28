'use client'

import { useGate }        from 'effector-react'
import { roomsListModel } from '@/widgets/connected-rooms-list/model'
import { list }           from '@effector/reflect'
import Link               from 'next/link'

export const ConnectedRoomsList = () => {
  useGate(roomsListModel.socket.Gate)

  return (
    <div>
      <button>join room</button>
      <RoomsList />
    </div>
  )
}

const RoomsList = list({
  source: roomsListModel.$rooms,
  view: (item: any) => {
    return (
      <div>
        <Link href={`/room/${item.id}`}>{item.id}</Link>
      </div>
    )
  }
})
