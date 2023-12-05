import { Socket }   from 'socket.io'
import { Nullable } from '@grnx-utils/types'

export interface FactorySendParams<T, M extends Record<string, string>> {
  method: Extract<keyof M, string>
  payload: T
  client?: Socket
  receiver?: Nullable<string>
}
