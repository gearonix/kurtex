import { combine }          from 'effector'
import { createEvent }      from 'effector'
import { merge }            from 'effector'
import { sample }           from 'effector'
import { statusDenied }     from './permissions'
import { statusGranted }    from './permissions'
import { createGate }       from 'effector-react'
import { getUserMediaFx }   from './effects'
import { navigationModel } from 'src/shared/model/navigation'
import { wss }              from './wss'

export const $roomId = combine(
  navigationModel.$params,
  (params) => (params?.id as string) ?? null
)

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
  target: [closeConnection, wss.leaveRoom]
})

sample({
  clock: startConnection,
  target: getUserMediaFx
})
