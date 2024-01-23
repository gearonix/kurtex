'use client'

import { connectedRpcLists } from '@/widgets/connected-rooms-list/model'
import { list }              from '@effector/reflect'
import Link                  from 'next/link'

export const ConnectedRoomsList = () => {
  return (
    <div>
      <Link href="/room/new">
        <button>create room</button>
      </Link>
      <RoomsList />
    </div>
  )
}

const RoomsList = list({
  source: connectedRpcLists.$rooms,
  view: (item: any) => {
    return (
      <div>
        <Link href={`/room/${item.id}`}>{item.id}</Link>
      </div>
    )
  }
})
