import { createEffect }          from 'effector'
import { createEvent }           from 'effector'
import { createStore }           from 'effector'
import { LOCAL_MEDIA_STREAM }    from './lib/consts'
import { statusDenied }          from './permissions'
import { Nullable }              from '@grnx-utils/types'
import { PeerConnectionCreated } from '@/entities/webrtc/model/lib/interfaces'

export const addRemoteStream = createEvent<PeerConnectionCreated>()

const $clientMediaStreams = createStore<
  Record<string, Nullable<HTMLVideoElement>>
>({
  [LOCAL_MEDIA_STREAM]: null
})

$clientMediaStreams.on(statusDenied, (streams) => ({
  ...streams,
  [LOCAL_MEDIA_STREAM]: null
}))

$clientMediaStreams.on(addRemoteStream, (streams, { peerId, remoteStream }) => {
  if (streams[peerId]) {
    streams[peerId]!.srcObject = remoteStream
  }

  return streams
})
