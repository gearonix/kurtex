import { createEffect } from 'effector'

export const getUserMediaFx = createEffect<void, MediaStream>(async () => {
  return navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
})
