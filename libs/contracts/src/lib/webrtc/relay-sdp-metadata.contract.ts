import { z }                   from 'zod'
import { Contract }            from '../../shared'
import { ChannelsMethodsKeys } from './websocket.methods'

export class RelaySdpMetadataRequest implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'relaySdp'

  public static readonly schema = z.object({
    peerId: z.string(),
    metadata: z.object({})
  })
}

export class RelaySdpMetadataResponse implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'metadataReceived'

  public static readonly schema = z.object({
    peerId: z.string(),
    metadata: z.object({})
  })
}

export type RelaySdp = z.infer<typeof RelaySdpMetadataRequest.schema>

export type MetadataReceived = z.infer<typeof RelaySdpMetadataResponse.schema>
