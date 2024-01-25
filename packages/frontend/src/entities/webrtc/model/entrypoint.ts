import { createEvent }     from 'effector'
import { createStore }     from 'effector'
import { merge }           from 'effector'
import { sample }          from 'effector'
import { statusDenied }    from './permissions'
import { statusGranted }   from './permissions'
import { createGate }      from 'effector-react'
import { getUserMediaFx }  from './effects/get-user-media.fx'
import { navigationModel } from '@/shared/model/navigation'
import { wss }             from './wss'
import { isString }        from '@kurtex/std'
import { Nullable }        from '@kurtex/std'

export const startConnection = createEvent()
export const closeConnection = createEvent()

export const rtcGate = createGate<{
  createRoom?: boolean
}>()

export const moduleStarted = merge([statusGranted, rtcGate.open])
export const moduleClosed = merge([statusDenied, rtcGate.close])

export const $roomId = createStore<Nullable<string>>(null)

sample({
  clock: rtcGate.open,
  fn: ({ params }) => {
    if (!isString(params.roomId)) {
      return null
    }

    return params.roomId
  },
  source: {
    params: navigationModel.$params
  },
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
