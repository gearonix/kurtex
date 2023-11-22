import { z }                   from 'zod'
import { createZodDto }        from 'nestjs-zod'
import { Contract }            from '@/shared'
import { WebsocketTopic }      from '@/shared'
import { ChannelsMethodsKeys } from '@/lib/webrtc/websocket.methods'

export abstract class RelayIceCandidateContract implements Contract {
  public static readonly topic: WebsocketTopic<ChannelsMethodsKeys> = {
    request: 'relayIceCandidate',
    response: 'iceCandidateReceived'
  }

  public static readonly schema = z.object({
    peerId: z.string(),
    iceCandidate: z.object({})
  })

  public static get dto() {
    return class Dto extends createZodDto(this.schema) {}
  }
}

export type RelayIceCandidate = z.infer<typeof RelayIceCandidateContract.schema>
