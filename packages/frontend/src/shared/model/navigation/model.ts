import { Nullable } from '@kurtex/std'
import { createStore, StoreWritable } from 'effector'
import { attach } from 'effector/compat'
import { createGate } from 'effector-react'
import { spread } from 'patronum'
import { atom } from '@/shared/factory/atom'
import { NextParams, NextRouter, NextSearchParams } from '@/shared/types'

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
