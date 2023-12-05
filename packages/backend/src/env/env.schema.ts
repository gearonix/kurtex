import { z } from 'zod'

export const EnvSchema = z
  .object({
    CLIENT_URL: z.string(),
    GRAPHQL_URI_PREFIX: z.string(),
    MONGODB_CONNECTION_URI: z.string(),
    MONGODB_PASSWORD: z.string(),
    MONGODB_USER: z.string(),
    NODE_ENV: z
      .union([
        z.literal('development'),
        z.literal('production'),
        z.literal('test')
      ])
      .default('development'),
    REDIS_HOST: z.string(),
    REDIS_PORT: z.string().regex(/^\d+$/),
    SERVER_PORT: z.string().regex(/^\d+$/),
    SERVER_PREFIX: z.string(),
    SERVER_URL: z.string(),
    SOURCE_ROOT_BACKEND: z.string()
  })
  .transform((env) => ({
    client: {
      url: env.CLIENT_URL
    },
    graphql: {
      prefix: env.GRAPHQL_URI_PREFIX
    },
    isDev: env.NODE_ENV === 'development',
    isProd: env.NODE_ENV === 'production',
    isTest: env.NODE_ENV === 'test',
    mongo: {
      password: env.MONGODB_PASSWORD,
      uri: env.MONGODB_CONNECTION_URI,
      user: env.MONGODB_USER
    },
    nodeEnv: env.NODE_ENV,
    port: env.SERVER_PORT,
    redis: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT
    },
    server: {
      prefix: env.SERVER_PREFIX,
      srcDir: env.SOURCE_ROOT_BACKEND,
      url: env.SERVER_URL
    }
  }))
