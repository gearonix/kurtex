import { z } from 'zod'

export const EnvSchema = z
  .object({
    GRAPHQL_URI_PREFIX: z.string(),
    NODE_ENV: z
      .union([
        z.literal('development'),
        z.literal('production'),
        z.literal('test')
      ])
      .default('development'),
    SERVER_PREFIX: z.string(),
    SERVER_URL: z.string(),
    SOURCE_ROOT_FRONTEND: z.string()
  })
  .transform((raw) => ({
    cwd: raw.SOURCE_ROOT_FRONTEND,
    graphql: {
      endpoint: `${raw.SERVER_URL}/${raw.GRAPHQL_URI_PREFIX}`,
      prefix: raw.GRAPHQL_URI_PREFIX
    },
    isDev: raw.NODE_ENV === 'development',
    isProd: raw.NODE_ENV === 'production',
    isTest: raw.NODE_ENV === 'test',
    nodeEnv: raw.NODE_ENV,
    server: {
      prefix: raw.SERVER_PREFIX,
      url: raw.SERVER_URL
    }
  }))
