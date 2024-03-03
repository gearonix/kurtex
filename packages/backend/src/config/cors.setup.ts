import { INestApplication } from '@nestjs/common'
// eslint-disable-next-line max-len
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { EnvService } from '../env'

export const setupCors = (app: INestApplication) => {
  const env = app.get(EnvService)

  const options: CorsOptions = {
    origin: new RegExp(env.client.url + '$'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  }

  app.enableCors(options)
}
