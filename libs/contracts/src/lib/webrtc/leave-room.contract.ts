import { z }                   from 'zod'
import { createZodDto }        from 'nestjs-zod'
import { Contract }            from '@/shared'
import { WebsocketTopic }      from '@/shared'
import { ChannelsMethodsKeys } from '@/lib/webrtc/websocket.methods'

export abstract class LeaveRoomContract implements Contract {
  public static readonly topic: WebsocketTopic<ChannelsMethodsKeys> = {
    request: 'leaveRoom',
    response: 'userDisconnected'
  }

  public static readonly schema = z.object({
    peerId: z.string()
  })

  public static get dto() {
    return class Dto extends createZodDto(this.schema) {}
  }
}

export type LeaveRoom = z.infer<typeof LeaveRoomContract.schema>
