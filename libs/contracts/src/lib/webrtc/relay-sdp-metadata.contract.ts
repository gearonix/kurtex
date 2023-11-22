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
  public static readonly topic: ChannelsMethodsKeys =
    'sessionDescriptionReceived'

  public static readonly schema = z.object({
    peerId: z.string(),
    metadata: z.object({})
  })
}

export type RelaySdpMetadataRequestSchema = z.infer<
  typeof RelaySdpMetadataRequest.schema
>

export type RelaySdpMetadataResponseSchema = z.infer<
  typeof RelaySdpMetadataResponse.schema
>
