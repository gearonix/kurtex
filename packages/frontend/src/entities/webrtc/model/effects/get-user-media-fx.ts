import { createEffect } from 'effector'
import { Stream }       from '@/entities/webrtc/model/core/stream'

export const getUserMediaFx = createEffect<void, Stream>(async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })

  return new Stream(localStream)
})
