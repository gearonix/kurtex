import { createStore } from 'effector'
import { env }         from '@/shared/env'

export const $apiBase = createStore(env.graphql.endpoint)
