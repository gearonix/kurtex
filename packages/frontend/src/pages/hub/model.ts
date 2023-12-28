import { declarePage }    from '@/shared/app'
import { sample }         from 'effector'
import { roomsListModel } from '@/widgets/connected-rooms-list'

export const hubPage = declarePage({
  page: 'hub'
})

sample({
  clock: hubPage.open,
  target: roomsListModel.moduleStarted
})
