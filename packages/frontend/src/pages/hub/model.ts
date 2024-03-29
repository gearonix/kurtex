import { sample } from 'effector'
import { declarePage } from '@/shared/app'
import { connectedRpcLists } from '@/widgets/connected-rooms-list'

export const hubPage = declarePage({
  page: 'hub'
})

sample({
  clock: hubPage.open,
  target: connectedRpcLists.moduleStarted
})
