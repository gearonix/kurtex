import { z }                   from 'zod'
import { WebsocketContract }   from '../../shared'
import { ChannelsMethodsKeys } from './methods'

export class ConnectUserRequest implements WebsocketContract {
  public static readonly topic: ChannelsMethodsKeys = 'joinRoom'

  public static readonly schema = z.object({
    roomId: z.string().uuid().nullable()
  })
}

export class ConnectUserResponse implements WebsocketContract {
  public static readonly topic: ChannelsMethodsKeys = 'userConnected'

  public static readonly schema = z.object({
    peerId: z.string(),
    shouldCreateOffer: z.boolean()
  })
}

export type JoinRoom = z.infer<typeof ConnectUserRequest.schema>

export type UserConnected = z.infer<typeof ConnectUserResponse.schema>
