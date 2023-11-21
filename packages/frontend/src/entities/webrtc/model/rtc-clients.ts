import { createEvent }        from 'effector'
import { createStore }        from 'effector'
import { sample }             from 'effector'
import { LOCAL_MEDIA_STREAM } from './lib/consts'
import { statusDenied }       from './permissions'
import { getUserMediaFx }     from './effects'
import { wss }                from '@/entities/webrtc/model/wss'

export const $rtcClients = createStore<string[]>([])

export const addRtcClient = createEvent<string>()

export const removeStream = createEvent<{
  peerId: string
}>()

$rtcClients.on(addRtcClient, (s, v) => [...s, v])

$rtcClients.on([wss.userDisconnected, removeStream], (clients, { peerId }) => {
  return clients.filter((c) => c !== peerId)
})

sample({
  clock: statusDenied,
  fn: () => ({
    peerId: LOCAL_MEDIA_STREAM
  }),
  target: removeStream
})

sample({
  clock: getUserMediaFx.doneData,
  fn: () => LOCAL_MEDIA_STREAM,
  target: addRtcClient
})
