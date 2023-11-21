import { createEffect } from 'effector'
import { sample }       from 'effector'
import { $roomId }      from '@/entities/webrtc/model/wss'
import { joinRoom }     from '@/entities/webrtc/model/wss'

export const getUserMediaFx = createEffect<void, MediaStream>(async () => {
  return navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
})

sample({
  clock: getUserMediaFx.doneData,
  source: $roomId,
  fn: (roomId) => ({ roomId }),
  target: joinRoom
})
