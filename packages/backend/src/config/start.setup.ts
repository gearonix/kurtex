import { INestApplication } from '@nestjs/common'
import { Logger }           from '@nestjs/common'
import { EnvService }       from '../env'

export const startApplication = async (app: INestApplication) => {
  const env = app.get(EnvService)

  await app.init()

  await app.listen(env.port)

  Logger.log(
    `🚀 Application is running on: ${env.server.url}`
  )

  Logger.log(`🚀 Port: ${env.port}`)
}
