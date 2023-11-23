import { z }                   from 'zod'
import { Contract }            from '../../shared'
import { ChannelsMethodsKeys } from './websocket.methods'

export abstract class LeaveRoomRequest implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'leaveRoom'
  public static readonly schema = z.object({
    peerId: z.string()
  })
}

export abstract class LeaveRoomResponse implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'userDisconnected'

  public static readonly schema = z.object({
    peerId: z.string()
  })
}

export type LeaveRoom = z.infer<typeof LeaveRoomRequest.schema>

export type UserDisconnected = z.infer<typeof LeaveRoomResponse.schema>
