import { Socket }   from 'socket.io'
import { Nullable } from '@kurtex/std'

export interface FactorySendParams<T, M extends Record<string, string>> {
  method: Extract<keyof M, string>
  payload: T
  client?: Socket
  receiver?: Nullable<string>
}
