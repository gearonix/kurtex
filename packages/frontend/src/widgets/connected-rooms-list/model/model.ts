import { createEvent, sample } from 'effector'
import { atom } from '@/shared/factory/atom'
import { getAllRpcChannels } from './requests'

export const connectedRpcLists = atom(() => {
  const moduleStarted = createEvent()

  const $rtcChannels = getAllRpcChannels.$data.map((channels) => {
    return channels ?? []
  })

  sample({
    clock: moduleStarted,
    target: getAllRpcChannels.refresh
  })

  return {
    $rtcChannels,
    moduleStarted
  }
})
