import { z }                   from 'zod'
import { Contract }            from '../../shared'
import { ChannelsMethodsKeys } from './websocket.methods'

export class LeaveRoomRequest implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'leaveRoom'
  public static readonly schema = z.object({
    peerId: z.string()
  })
}

export class LeaveRoomResponse implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'userDisconnected'

  public static readonly schema = z.object({
    peerId: z.string()
  })
}

export type LeaveRoomRequestSchema = z.infer<typeof  LeaveRoomRequest.schema>

export type LeaveRoomResponseSchema = z.infer<typeof LeaveRoomResponse.schema>
