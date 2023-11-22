import { z }                   from 'zod'
import { createZodDto }        from 'nestjs-zod'
import { Contract }            from '../../shared'
import { ChannelsMethodsKeys } from './websocket.methods'

export class LeaveRoomRequest implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'leaveRoom'
  public static readonly schema = z.object({
    peerId: z.string()
  })

  public static get dto() {
    return class Dto extends createZodDto(this.schema) {}
  }
}

export class LeaveRoomResponse implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'userDisconnected'

  public static readonly schema = z.object({
    peerId: z.string()
  })
}

export type LeaveRoomRequestDto = InstanceType<typeof LeaveRoomRequest.dto>

export type LeaveRoomResponseSchema = z.infer<typeof LeaveRoomResponse.schema>
