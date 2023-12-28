import { EnvSchema }     from './schema'
import { isClient }      from '@/shared/lib'
import { nextPublicEnv } from '@/shared/env/public'

export const env = EnvSchema.parse(nextPublicEnv)

if (env.isDev && isClient()) {
  window.ENV = env
}
