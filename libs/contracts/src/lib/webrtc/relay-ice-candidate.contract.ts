import { z }                   from 'zod'
import { WebsocketContract }   from '../../shared'
import { ChannelsMethodsKeys } from './methods'

export class RelayIceCandidateRequest implements WebsocketContract {
  public static readonly topic: ChannelsMethodsKeys = 'relayIceCandidate'

  public static readonly schema = z.object({
    iceCandidate: z.object({}),
    peerId: z.string()
  })
}

export class RelayIceCandidateResponse implements WebsocketContract {
  public static readonly topic: ChannelsMethodsKeys = 'iceCandidateReceived'

  public static readonly schema = z.object({
    iceCandidate: z.object({}),
    peerId: z.string()
  })
}

export type RelayIceCandidate = z.infer<typeof RelayIceCandidateRequest.schema>

export type IceCandidateReceived = z.infer<
  typeof RelayIceCandidateResponse.schema
>
