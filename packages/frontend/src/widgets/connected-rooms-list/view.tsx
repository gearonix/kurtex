'use client'

import { connectedRpcLists }  from '@/widgets/connected-rooms-list/model'
import { list }               from '@effector/reflect'
import Link                   from 'next/link'
import { ReceivedRtcChannel } from '@kurtex/contracts'

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
  source: connectedRpcLists.$rtcChannels,
  view: (channel: ReceivedRtcChannel) => {
    console.log(channel)
    return (
      <div>
        <Link href={`/room/${channel.id}`}>{channel.id}</Link>
      </div>
    )
  }
})
