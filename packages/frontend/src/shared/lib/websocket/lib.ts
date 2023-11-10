import { createGate }     from 'effector-react'
import { createEffect }   from 'effector'
import { createEvent }    from 'effector'
import { restore }        from 'effector'
import { sample }         from 'effector'
import { io }             from 'socket.io-client'
import { ManagerOptions } from 'socket.io-client'
import { Socket }         from 'socket.io-client'
import { SocketOptions }  from 'socket.io-client'
import { AnyObject }      from '@grnx-utils/types'
import { Undefinable }    from '@grnx-utils/types'
import { Wrap }           from '@/shared/lib/interfaces'

export interface WebsocketGateProps<Methods extends Record<string, string>> {
  uri: string
  methods: Methods
  options?: Undefinable<Partial<ManagerOptions & SocketOptions>>
  dataPrefix?: string
}

export const createSocket = <Methods extends Record<string, string>>({
  uri,
  options,
  dataPrefix,
  methods
}: WebsocketGateProps<Methods>) => {
  const websocketGate = createGate<Socket>()

  const connectToSocketFx = createEffect(() => io(uri, options))

  const $instance = restore(connectToSocketFx, null)
    .on(websocketGate.close, (ins) => {
      ins?.disconnect()
    })
    .reset(websocketGate.close)

  sample({
    clock: websocketGate.open,
    target: connectToSocketFx
  })

  const restoreMethod = <Result extends AnyObject, Def = null>(
    currentMethod: keyof Methods,
    defaultValue: Def
  ) => {
    const doneData = createEvent<Def | Result>()

    // eslint-disable-next-line effector/no-watch
    $instance.watch((instance) => {
      const methodToSend: string = methods[currentMethod]

      if (!instance) return

      if (!methodToSend) {
        // TODO: refactor this
        throw new Error('error')
      }

      instance.off(methodToSend)

      instance.on(methodToSend, (data: Wrap<Result, typeof dataPrefix>) => {
        const payload = dataPrefix ? data[dataPrefix] : data

        if (!payload) {
          throw new Error('error')
        }

        doneData(payload as Result)
      })
    })

    return restore<Def | Result>(doneData, defaultValue)
  }

  return {
    gate: websocketGate,
    $instance,
    restore: restoreMethod
  }
}

export const child = () => {}
