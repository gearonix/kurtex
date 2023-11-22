import { restore }        from 'effector'
import { moduleClosed }   from './entrypoint'
import { getUserMediaFx } from './effects'

export const $localStream = restore(getUserMediaFx.doneData, null)

$localStream.on(moduleClosed, (stream) => stream?.close())
