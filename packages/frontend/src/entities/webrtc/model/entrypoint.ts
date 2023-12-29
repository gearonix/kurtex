import { createEvent }     from 'effector'
import { merge }           from 'effector'
import { sample }          from 'effector'
import { statusDenied }    from './permissions'
import { statusGranted }   from './permissions'
import { createGate }      from 'effector-react'
import { getUserMediaFx }  from './effects'
import { navigationModel } from 'src/shared/model/navigation'
import { wss }             from './wss'
import { Nullable }        from '@grnx-utils/types'

export const startConnection = createEvent()
export const closeConnection = createEvent()

export const rtcGate = createGate<{
  createRoom: boolean
}>()

export const moduleStarted = merge([statusGranted, rtcGate.open])
export const moduleClosed = merge([statusDenied, rtcGate.close])

export const $roomId = navigationModel.$params.map<string | null>(
  (params) => params?.id as Nullable<string>
)

sample({
  clock: rtcGate.open,
  filter: ({ createRoom }) => createRoom,
  fn: () => null,
  target: $roomId
})

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
