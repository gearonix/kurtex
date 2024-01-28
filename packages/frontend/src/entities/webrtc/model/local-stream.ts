import { createStore } from 'effector'
import { Stream }      from '@/entities/webrtc/model/core/stream'
import { Nullable }    from '@kurtex/std'

export const $localStream = createStore<Nullable<Stream>>(null)
