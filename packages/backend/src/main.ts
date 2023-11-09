import { NestFactory }      from '@nestjs/core'
import { AppModule }        from './app.module'
import { EnvService }       from './env'
import { setupCors }        from './conf'
import { startApplication } from './conf/start'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  setupCors(app)

  const env = app.get(EnvService)

  app.setGlobalPrefix(env.server.prefix)
  app.enableShutdownHooks()

  startApplication(app)
}

void bootstrap()

process.once('SIGUSR2', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
