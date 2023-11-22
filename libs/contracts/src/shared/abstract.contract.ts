export abstract class Contract {
  public static readonly topic: string

  public static readonly schema: z.ZodSchema
  /**
   * Basically dto type is ZodDto from nest-zod, but we don't want
   * to force nx to include some backend dependencies like @nest/core
   * and class-validator
   */
  public static dto?: () => new () => unknown
}
