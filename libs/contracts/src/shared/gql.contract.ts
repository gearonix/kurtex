import { z } from 'zod'

export abstract class GraphqlContract {
  public static readonly operation: string

  public static readonly schema: z.ZodSchema
}
