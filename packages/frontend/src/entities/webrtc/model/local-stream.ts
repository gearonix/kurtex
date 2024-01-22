import { restore }        from 'effector'
import { moduleClosed }   from './entrypoint'
import { getUserMediaFx } from './effects/get-user-media.fx'

export const $localStream = restore(getUserMediaFx.doneData, null)

// TODO: rewrite .on to effector samples

$localStream.on(moduleClosed, (stream) => stream?.close())
