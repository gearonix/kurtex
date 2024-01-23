import { z }                   from 'zod'
import { WebsocketContract }   from '../../shared'
import { ChannelsMethodsKeys } from './methods'

export class LeaveRoomRequest implements WebsocketContract {
  public static readonly topic: ChannelsMethodsKeys = 'leaveRoom'
  public static readonly schema = z.object({
    peerId: z.string().optional()
  })
}

export class LeaveRoomResponse implements WebsocketContract {
  public static readonly topic: ChannelsMethodsKeys = 'userDisconnected'

  public static readonly schema = z.object({
    peerId: z.string()
  })
}

export type LeaveRoom = z.infer<typeof LeaveRoomRequest.schema>

export type UserDisconnected = z.infer<typeof LeaveRoomResponse.schema>
