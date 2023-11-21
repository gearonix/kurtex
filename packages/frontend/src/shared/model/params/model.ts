import { atom }        from '@/shared/factory/atom'
import { createGate }  from 'effector-react'
import { AnyObject }   from '@grnx-utils/types'
import { Nullable }    from '@grnx-utils/types'
import { createStore } from 'effector'

export const paramsModel = atom(() => {
  const ParamsGate = createGate<{ params: AnyObject }>()

  const $params = createStore<Nullable<AnyObject>>(null)
    .on(ParamsGate.open, (_, { params }) => params)
    .reset(ParamsGate.close)

  return {
    ParamsGate,
    $params
  }
})
