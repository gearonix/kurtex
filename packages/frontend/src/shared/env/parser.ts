import { nextPublicEnv } from '@/shared/env/public'
import { isClient } from '@/shared/lib'
import { EnvSchema } from './schema'

export const env = EnvSchema.parse(nextPublicEnv)

if (env.isDev && isClient()) {
  window.ENV = env
}
