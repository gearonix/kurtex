import { z }                   from 'zod'
import { Contract }            from '../../shared'
import { ChannelsMethodsKeys } from './websocket.methods'

export abstract class ConnectUserRequest implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'joinRoom'

  public static readonly schema = z.object({
    roomId: z.string().uuid().nullable()
  })
}

export abstract class ConnectUserResponse implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'userConnected'

  public static readonly schema = z.object({
    peerId: z.string(),
    shouldCreateOffer: z.boolean()
  })
}

export type JoinRoom = z.infer<typeof ConnectUserRequest.schema>

export type UserConnected = z.infer<typeof ConnectUserResponse.schema>
