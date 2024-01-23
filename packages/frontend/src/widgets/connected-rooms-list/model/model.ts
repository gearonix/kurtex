import { atom }              from '@/shared/factory/atom'
import { createEvent }       from 'effector'
import { getAllRpcChannels } from './requests'

export const connectedRpcLists = atom(() => {
  const moduleStarted = createEvent()

  const $rooms = getAllRpcChannels.$data.map((channels) => {
    return channels ?? []
  })

  return {
    $rooms,
    moduleStarted
  }
})
