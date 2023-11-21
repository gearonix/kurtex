import { createEffect }          from 'effector'
import { createStore }           from 'effector'
import { LOCAL_MEDIA_STREAM }      from './lib/consts'
import { statusDenied }          from './permissions'
import { Nullable }              from '@grnx-utils/types'
import { peerConnectionCreated } from './wss'

const $clientMediaStreams = createStore<
  Record<string, Nullable<HTMLVideoElement>>
>({
  [LOCAL_MEDIA_STREAM]: null
})

$clientMediaStreams.on(statusDenied, (streams) => ({
  ...streams,
  [LOCAL_MEDIA_STREAM]: null
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
