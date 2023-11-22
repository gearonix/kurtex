import { z }                   from 'zod'
import { Contract }            from '../../shared'
import { ChannelsMethodsKeys } from './websocket.methods'

export class ConnectUserRequest implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'joinRoom'

  public static readonly schema = z.object({
    roomId: z.string().uuid()
  })

}

export class ConnectUserResponse implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'userConnected'

  public static readonly schema = z.object({
    peerId: z.string(),
    shouldCreateOffer: z.boolean()
  })
}

export type ConnectUserRequestSchema = z.infer<typeof ConnectUserRequest.schema>

export type ConnectUserResponseSchema = z.infer<
  typeof ConnectUserResponse.schema
>
