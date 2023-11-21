import { createEvent }    from 'effector'
import { merge }          from 'effector'
import { sample }         from 'effector'
import { statusDenied }   from './permissions'
import { statusGranted }  from './permissions'
import { createGate }     from 'effector-react'
import { leaveRoom }      from './wss'
import { getUserMediaFx } from './effects'

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
  target: [closeConnection, leaveRoom]
})

sample({
  clock: startConnection,
  target: getUserMediaFx
})
