import { z }                   from 'zod'
import { createZodDto }        from 'nestjs-zod'
import { Contract }            from '@/shared'
import { WebsocketTopic }      from '@/shared'
import { ChannelsMethodsKeys } from '@/lib/webrtc/websocket.methods'

export abstract class RelaySdpMetadataContract implements Contract {
  public static readonly topic: WebsocketTopic<ChannelsMethodsKeys> = {
    request: 'relaySdp',
    response: 'sessionDescriptionReceived'
  }

  public static readonly schema = z.object({
    peerId: z.string(),
    metadata: z.object({})
  })

  public static get dto() {
    return class Dto extends createZodDto(this.schema) {}
  }
}

export type RelaySdpMetadata = z.infer<typeof RelaySdpMetadataContract.schema>
