import { createEvent }      from 'effector'
import { createStore }      from 'effector'
import { sample }           from 'effector'
import { localMediaStream } from './lib/consts'
import { statusDenied }     from './permissions'
import { getUserMediaFx }   from './effects'

export const $rtcClients = createStore<string[]>([])

export const addRtcClient = createEvent<string>()

$rtcClients.on(addRtcClient, (s, v) => [...s, v])

$rtcClients.on(statusDenied, (clients) => {
  return clients.filter((c) => c !== localMediaStream)
})

sample({
  clock: getUserMediaFx.doneData,
  fn: () => localMediaStream,
  target: addRtcClient
})
