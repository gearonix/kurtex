import { createEvent } from 'effector'
import { createStore } from 'effector'
import { sample }      from 'effector'
import { Nullable }    from '@grnx-utils/types'
import { Page }        from './config/pages'

export const pageStarted = createEvent<{
  page: Page
  ctx: unknown
}>()

export const $currentPage = createStore<Nullable<Page>>(null).on(
  pageStarted,
  (_, { page }) => page
)

interface DeclarePageConfig<Ctx> {
  page: Page
  contextContract?: {
    isData: (data: unknown) => data is Ctx
  }
}

export const declarePage = <Ctx = void>(config: DeclarePageConfig<Ctx>) => {
  const open = createEvent<Ctx>()

  const $ctx = createStore<Nullable<Ctx>>(null, {
    sid: `pageCtx:${config.page}`
  })

  sample({
    clock: open,
    filter: (rawCtx) => {
      if (config.contextContract) {
        return config.contextContract.isData(rawCtx)
      }
      /**
       * Skip as-is, if no contract is provided
       */
      return true
    },
    target: [
      $ctx,
      pageStarted.prepend((ctx: Ctx) => ({
        ctx,
        page: config.page
      }))
    ]
  })

  const $active = $currentPage.map((page) => page === config.page)

  const activated = sample({
    clock: $active,
    filter: Boolean
  })

  const deactivated = sample({
    clock: $active,
    filter: (active) => !active
  })

  const opened = createEvent<Ctx>()
  const closed = createEvent<Ctx>()

  sample({
    clock: activated,
    fn: (ctx) => ctx as Ctx,
    source: $ctx,
    target: opened
  })

  sample({
    clock: deactivated,
    fn: (ctx) => ctx as Ctx,
    source: $ctx,
    target: closed
  })

  return {
    $active,
    closed,
    open,
    opened
  }
}
