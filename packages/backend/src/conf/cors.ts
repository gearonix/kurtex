import { INestApplication } from '@nestjs/common'
import { EnvService }       from '../env'
// eslint-disable-next-line max-len
import { CorsOptions }      from '@nestjs/common/interfaces/external/cors-options.interface'

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
