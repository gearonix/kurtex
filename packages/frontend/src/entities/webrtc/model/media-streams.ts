import { createEffect }          from 'effector'
import { createStore }           from 'effector'
import { localMediaStream }      from '@/entities/webrtc/lib/consts'
import { statusDenied }          from '@/entities/webrtc/model/permissions'
import { Nullable }              from '@grnx-utils/types'
import { peerConnectionCreated } from './wss'

const $clientMediaStreams = createStore<
  Record<string, Nullable<HTMLVideoElement>>
>({
  [localMediaStream]: null
})

$clientMediaStreams.on(statusDenied, (streams) => ({
  ...streams,
  [localMediaStream]: null
}))

$clientMediaStreams.on(peerConnectionCreated, (
  streams,
  { peerId, remoteStream }
) => {
  if (streams[peerId]) {
    streams[peerId]!.srcObject = remoteStream
  }

  return streams
})


