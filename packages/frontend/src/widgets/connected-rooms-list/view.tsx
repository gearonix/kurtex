'use client'

import { useGate }        from 'effector-react'
import { roomsListModel } from '@/widgets/connected-rooms-list/model'
import { useStore }       from 'effector-react'

export const ConnectedRoomsList = () => {
  useGate(roomsListModel.socket.Gate)
  const rooms = useStore(roomsListModel.$rooms)

  console.log(rooms)

  return null
}
