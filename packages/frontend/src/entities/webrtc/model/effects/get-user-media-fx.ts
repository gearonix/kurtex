import { createEffect } from 'effector'
import { sample }       from 'effector'
import { wss }          from '@/entities/webrtc/model/wss'
import { $roomId }      from '@/entities/webrtc/model/entrypoint'
import { Stream }       from '@/entities/webrtc/model/core/stream'

export const getUserMediaFx = createEffect<void, Stream>(async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })

  return new Stream(localStream)
})

sample({
  clock: getUserMediaFx.doneData,
  source: $roomId,
  fn: (roomId, roomIdw) => ({ roomId }),
  target: wss.joinRoom
})
