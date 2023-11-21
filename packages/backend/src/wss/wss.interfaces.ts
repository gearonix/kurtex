import { Socket } from 'socket.io'

export interface FactorySendParams<T, M extends Record<string, string>>{
  method: Extract<keyof M, string>
  payload: T
  client?: Socket
  receiver?: string
}
