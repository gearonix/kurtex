import { NestFactory }            from '@nestjs/core'
import { AppModule }              from './app.module'
import { EnvService }             from './env'
import { setupCors }              from './conf'
import { startApplication }       from './conf/start'
import { FastifyAdapter }         from '@nestjs/platform-fastify'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import helmet                     from '@fastify/helmet'

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  )

  setupCors(app)

  const env = app.get(EnvService)

  app.setGlobalPrefix(env.server.prefix)
  app.enableShutdownHooks()

  app.use(helmet)

  await startApplication(app)
}

void bootstrap()

process.once('SIGUSR2', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
