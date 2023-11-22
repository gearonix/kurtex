import { z }                   from 'zod'
import { createZodDto }        from 'nestjs-zod'
import { Contract }            from '../../shared'
import { ChannelsMethodsKeys } from './websocket.methods'

export class ConnectUserRequest implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'joinRoom'

  public static readonly schema = z.object({
    roomId: z.string().uuid()
  })

  public static get dto() {
    return class extends createZodDto(this.schema) {}
  }
}

export class ConnectUserResponse implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'userConnected'

  public static readonly schema = z.object({
    peerId: z.string(),
    shouldCreateOffer: z.boolean()
  })
}

export type ConnectUserRequestDto = InstanceType<typeof ConnectUserRequest.dto>

export type ConnectUserResponseSchema = z.infer<
  typeof ConnectUserResponse.schema
>
