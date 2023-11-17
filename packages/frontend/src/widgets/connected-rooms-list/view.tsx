'use client'

import { useGate }        from 'effector-react'
import { roomsListModel } from '@/widgets/connected-rooms-list/model'
import { list }           from '@effector/reflect'

export const ConnectedRoomsList = () => {
  useGate(roomsListModel.socket.Gate)

  return <RoomsList />
}

const RoomsList = list({
  source: roomsListModel.$rooms,
  view: (item: any) => {
    return <div>{item.id}</div>
  }
})
