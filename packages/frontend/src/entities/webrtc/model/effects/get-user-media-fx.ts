import { createEffect } from 'effector'
import { sample }       from 'effector'
import { wss }          from '@/entities/webrtc/model/wss'
import { $roomId }      from '@/entities/webrtc/model/entrypoint'

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
  target: wss.joinRoom
})
