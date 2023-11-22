import { z }                   from 'zod'
import { createZodDto }        from 'nestjs-zod'
import { Contract }            from '@/shared'
import { WebsocketTopic }      from '@/shared'
import { ChannelsMethodsKeys } from '@/lib/webrtc/websocket.methods'

export abstract class ConnectUserContract implements Contract {
  public static readonly topic: WebsocketTopic<ChannelsMethodsKeys> = {
    request: 'joinRoom',
    response: 'userConnected'
  }

  public static readonly schema = z.object({
    peerId: z.string(),
    shouldCreateOffer: z.boolean()
  })

  public static get dto() {
    return class Dto extends createZodDto(this.schema) {}
  }
}

export type UserConnected = z.infer<typeof ConnectUserContract.schema>
