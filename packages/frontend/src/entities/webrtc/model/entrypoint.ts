import { createEvent }    from 'effector'
import { merge }          from 'effector'
import { sample }         from 'effector'
import { getUserMediaFx } from '@/entities/webrtc/model/media-streams'
import { statusDenied }   from '@/entities/webrtc/model/permissions'
import { statusGranted }  from '@/entities/webrtc/model/permissions'
import { createGate }     from 'effector-react'

export const startConnection = createEvent()
export const closeConnection = createEvent()

export const rtcGate = createGate()

export const moduleStarted = merge([statusGranted, rtcGate.open])
export const moduleClosed = merge([statusDenied, rtcGate.close])

sample({
  clock: moduleStarted,
  target: startConnection
})

sample({
  clock: moduleClosed,
  target: closeConnection
})

sample({
  clock: startConnection,
  target: getUserMediaFx
})
