import { atom }              from '@/shared/factory/atom'
import { createEvent }       from 'effector'
import { createStore }       from 'effector'
import { sample }            from 'effector'
import { getAllRpcChannels } from './requests'

export const connectedRpcLists = atom(() => {
  const moduleStarted = createEvent()

  const $rooms = createStore<{ id: string }[]>([])

  sample({
    clock: moduleStarted,
    target: getAllRpcChannels.refresh
  })

  sample({
    clock: getAllRpcChannels.finished.success,
    fn: (data) => {
      console.log('SUCCESS')
      console.log(data)
    }
  })

  sample({
    clock: getAllRpcChannels.finished.failure,
    fn: (data) => {
      console.log(data.error.response)
    }
  })

  return {
    $rooms,
    moduleStarted
  }
})
