import {restore} from 'effector'
import {moduleClosed} from '@/entities/webrtc/model/entrypoint'
import {getUserMediaFx} from "@/entities/webrtc/model/effects/get-user-media-fx";

export const $localStream = restore(getUserMediaFx.doneData, null)

$localStream.on(moduleClosed, (stream) => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop())
  }

  return null
})
