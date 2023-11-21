import { createEvent }        from 'effector'
import { createStore }        from 'effector'
import { sample }             from 'effector'
import { LOCAL_MEDIA_STREAM } from './lib/consts'
import { statusDenied }       from './permissions'
import { getUserMediaFx }     from './effects'

export const $rtcClients = createStore<string[]>([])

export const addRtcClient = createEvent<string>()

$rtcClients.on(addRtcClient, (s, v) => [...s, v])

$rtcClients.on(statusDenied, (clients) => {
  return clients.filter((c) => c !== LOCAL_MEDIA_STREAM)
})

sample({
  clock: getUserMediaFx.doneData,
  fn: () => LOCAL_MEDIA_STREAM,
  target: addRtcClient
})
