import { z }                   from 'zod'
import { createZodDto }        from 'nestjs-zod'
import { Contract }            from '../../shared'
import { ChannelsMethodsKeys } from './websocket.methods'

export class RelaySdpMetadataRequest implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'relaySdp'

  public static readonly schema = z.object({
    peerId: z.string(),
    metadata: z.object({})
  })

  public static get dto() {
    return class Dto extends createZodDto(this.schema) {}
  }
}

export class RelaySdpMetadataResponse implements Contract {
  public static readonly topic: ChannelsMethodsKeys =
    'sessionDescriptionReceived'

  public static readonly schema = z.object({
    peerId: z.string(),
    metadata: z.object({})
  })
}

export type RelaySdpMetadataRequestDto = InstanceType<
  typeof RelaySdpMetadataRequest.dto
>

export type RelaySdpMetadataResponseSchema = z.infer<
  typeof RelaySdpMetadataResponse.schema
>
