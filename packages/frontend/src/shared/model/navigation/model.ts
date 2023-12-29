import { atom }             from '@/shared/factory/atom'
import { createGate }       from 'effector-react'
import { Nullable }         from '@grnx-utils/types'
import { createStore }      from 'effector'
import { NextParams }       from '@/shared/types'
import { NextSearchParams } from '@/shared/types'
import { NextRouter }       from '@/shared/types'
import { attach }           from 'effector/compat'

interface RouterGateOptions {
  router: NextRouter
  params: NextParams
  query: NextSearchParams
}

export const navigationModel = atom(() => {
  const RouterGate = createGate<RouterGateOptions>()

  const $router = createStore<Nullable<NextRouter>>(null).on(
    RouterGate.open,
    (_, { router }) => router
  )

  const $params = createStore<Nullable<NextParams>>(null).on(
    RouterGate.open,
    (_, { params }) => params
  )

  const $query = createStore<Nullable<URLSearchParams>>(null).on(
    RouterGate.open,
    (_, { query }) => query
  )

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
