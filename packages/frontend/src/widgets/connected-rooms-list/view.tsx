'use client'

import { roomsListModel } from '@/widgets/connected-rooms-list/model'
import { list }           from '@effector/reflect'
import Link               from 'next/link'
import { useRouter }      from 'next/navigation'
import { useParams }      from 'next/navigation'

export const ConnectedRoomsList = () => {
  return (
    <div>
      <button>create room</button>
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
