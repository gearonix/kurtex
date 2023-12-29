import { createStore } from 'effector'
import { env }         from '@/shared/env'

export const $apiBaseUrl = createStore(env.graphql.endpoint)
