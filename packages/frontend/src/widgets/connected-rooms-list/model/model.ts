import { atom }           from '@/shared/factory/atom'
import { createEvent }    from 'effector'
import { createStore }    from 'effector'
import { sample }         from 'effector'
import { getAllChannels } from './requests'

export const roomsListModel = atom(() => {
  const moduleStarted = createEvent()

  const $rooms = createStore<{ id: string }[]>([])

  sample({
    clock: moduleStarted,
    target: getAllChannels.refresh
  })

  getAllChannels.$data.watch(console.log)

  sample({
    clock: getAllChannels.finished.success,
    fn: (data) => {
      console.log(data)
    }
  })

  return {
    $rooms,
    moduleStarted
  }
})
