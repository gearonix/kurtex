import { atom }             from '@/shared/factory/atom'
import { createGate }       from 'effector-react'
import { Nullable }         from '@kurtex/std'
import { createStore }      from 'effector'
import { StoreWritable }    from 'effector'
import { NextParams }       from '@/shared/types'
import { NextRouter }       from '@/shared/types'
import { NextSearchParams } from '@/shared/types'
import { attach }           from 'effector/compat'
import { spread }           from 'patronum'

interface RouterGateOptions {
  router: NextRouter
  params: NextParams
  query: NextSearchParams
}

export const navigationModel = atom(() => {
  const RouterGate = createGate<RouterGateOptions>()

  const $router = createStore<Nullable<NextRouter>>(null)
  const $params = createStore<NextParams>({})
  const $query = createStore<Nullable<URLSearchParams>>(null)

  spread({
    source: RouterGate.open,
    targets: {
      params: $params,
      query: $query,
      router: $router as StoreWritable<NextRouter>
    }
  })

  const pushFx = attach({
    effect: (router, url: string) => {
      router?.push(url)
    },
    source: $router
  })

  return {
    $params,
    $query,
    $router,
    RouterGate,
    pushFx
  }
})
