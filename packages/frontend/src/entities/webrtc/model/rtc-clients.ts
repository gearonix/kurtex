import { createEvent }             from 'effector'
import { createStore }             from 'effector'
import { sample }                  from 'effector'
import { LOCAL_MEDIA_STREAM }      from './lib/consts'
import { addIceCandidateFx }       from './effects'
import { addSessionDescriptionFx } from './effects'
import { getUserMediaFx }          from './effects/get-user-media-fx'
import { wss }                     from './wss'
import { $roomId }                 from './entrypoint'
import { statusDenied }            from './permissions'

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
  clock: getUserMediaFx.doneData,
  fn: (roomId) => ({ roomId }),
  source: $roomId,
  target: wss.joinRoom
})

sample({
  clock: getUserMediaFx.doneData,
  fn: () => LOCAL_MEDIA_STREAM,
  target: addRtcClient
})

sample({
  clock: wss.sessionDescriptionReceived,
  target: addSessionDescriptionFx
})

sample({
  clock: wss.iceCandidateReceived,
  target: addIceCandidateFx
})

sample({
  clock: statusDenied,
  fn: () => ({
    peerId: LOCAL_MEDIA_STREAM
  }),
  target: removeStream
})
