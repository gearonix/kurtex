import { z }                   from 'zod'
import { Contract }            from '../../shared'
import { ChannelsMethodsKeys } from './websocket.methods'

export abstract class RelayIceCandidateRequest implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'relayIceCandidate'

  public static readonly schema = z.object({
    peerId: z.string(),
    iceCandidate: z.object({})
  })
}

export abstract class RelayIceCandidateResponse implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'iceCandidateReceived'

  public static readonly schema = z.object({
    peerId: z.string(),
    iceCandidate: z.object({})
  })
}

export type RelayIceCandidate = z.infer<typeof RelayIceCandidateResponse.schema>

export type IceCandidateReceived = z.infer<
  typeof RelayIceCandidateResponse.schema
>
