import { z } from 'zod'

export const EnvSchema = z
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
    REDIS_PORT: z.string().regex(/^\d+$/),
    MONGODB_CONNECTION_URI: z.string(),
    MONGODB_USER: z.string(),
    MONGODB_PASSWORD: z.string()
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
    mongo: {
      uri: env.MONGODB_CONNECTION_URI,
      user: env.MONGODB_USER,
      password: env.MONGODB_PASSWORD
    },
    port: env.SERVER_PORT
  }))
