import { z }      from 'zod'
import { ZodDto } from 'nestjs-zod'

export abstract class Contract {
  public static readonly topic: {
    request: string
    response: string
  }
  public static readonly schema: z.ZodSchema
  public static dto: () => new () => ZodDto
}
