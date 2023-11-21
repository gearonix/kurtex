import { z }         from 'zod'
import { AnyObject } from '@grnx-utils/types'

const EnvSchema = z
  .object({
    NODE_ENV: z
      .union([
        z.literal('development'),
        z.literal('production'),
        z.literal('test')
      ])
      .default('development'),
    SERVER_URL: z.string(),
    SERVER_PORT: z.string().regex(/^\d+$/),
    SERVER_PREFIX: z.string(),
    CLIENT_URL: z.string(),
    REDIS_HOST: z.string(),
    REDIS_PORT: z.string().regex(/^\d+$/)
  })
  .transform((env) => ({
    nodeEnv: env.NODE_ENV,
    isDev: env.NODE_ENV === 'development',
    isProd: env.NODE_ENV === 'production',
    isTest: env.NODE_ENV === 'test',
    server: {
      url: env.SERVER_URL,
      prefix: env.SERVER_PREFIX
    },
    client: {
      url: env.CLIENT_URL
    },
    redis: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT
    },
    port: env.SERVER_PORT
  }))

export const createEnvValues = () => {
  return class EnvValues {} as {
    new (): z.infer<typeof EnvSchema>
  }
}

export class EnvValues extends createEnvValues() {}

export const validate = (raw: AnyObject) => {
  try {
    return { values: EnvSchema.parse(raw) }
  } catch (error) {
    const isZodError = error instanceof z.ZodError

    if (!isZodError) throw new Error('Unknown error parsing .env file')

    console.error('Invalid .env file. See below for detailed info.')
    console.info('\n')
    console.info(error.format())

    process.exit(1)
  }
}
