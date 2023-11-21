import { z }            from 'zod'
import { createZodDto } from 'nestjs-zod'
import { Contract }     from '@/shared'

export abstract class ConnectUserContract implements Contract {
  public static readonly topic = 'channels.user-connected' as const

  public static readonly schema = z.object({
    peerId: z.string(),
    shouldCreateOffer: z.boolean()
  })

  public static get dto() {
    return class Dto extends createZodDto(this.schema) {}
  }
}

export type UserConnected = z.infer<typeof ConnectUserContract.schema>
