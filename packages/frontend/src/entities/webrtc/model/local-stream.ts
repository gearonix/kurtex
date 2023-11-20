import { restore }        from 'effector'
import { getUserMediaFx } from '@/entities/webrtc/model/media-streams'
import { moduleClosed }   from '@/entities/webrtc/model/core'

export const $localStream = restore(getUserMediaFx.doneData, null)

$localStream.on(moduleClosed, (stream) => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop())
  }

  return null
})
