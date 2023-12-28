import { createEvent }           from 'effector'
import { createStore }           from 'effector'
import { LOCAL_MEDIA_STREAM }    from './lib/consts'
import { statusDenied }          from './permissions'
import { Nullable }              from '@grnx-utils/types'
import { PeerConnectionCreated } from '@/entities/webrtc/model/lib/interfaces'
import { ProvideMediaRef }       from '@/entities/webrtc/model/lib/interfaces'
import { wss }                   from '@/entities/webrtc/model/wss'
import { removeKey }             from '@/shared/lib'

export const addRemoteStream = createEvent<PeerConnectionCreated>()
export const provideMediaRef = createEvent<ProvideMediaRef>()

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

$clientMediaStreams.on(provideMediaRef, (streams, { ref, peerId }) => ({
  ...streams,
  [peerId]: ref
}))

$clientMediaStreams.on(wss.userDisconnected, (streams, { peerId }) => {
  const [clone] = removeKey(streams, peerId)

  return clone
})
