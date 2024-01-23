import { z }                   from 'zod'
import { WebsocketContract }   from '../../shared'
import { ChannelsMethodsKeys } from './methods'

export class RelaySdpMetadataRequest implements WebsocketContract {
  public static readonly topic: ChannelsMethodsKeys = 'relaySdp'

  public static readonly schema = z.object({
    metadata: z.object({}),
    peerId: z.string()
  })
}

export class RelaySdpMetadataResponse implements WebsocketContract {
  public static readonly topic: ChannelsMethodsKeys = 'metadataReceived'

  public static readonly schema = z.object({
    metadata: z.object({}),
    peerId: z.string()
  })
}

export type RelaySdp = z.infer<typeof RelaySdpMetadataRequest.schema>

export type MetadataReceived = z.infer<typeof RelaySdpMetadataResponse.schema>
