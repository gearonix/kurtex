import { NestFactory }            from '@nestjs/core'
import { AppModule }              from './app.module'
import { EnvService }             from './env'
import { setupCors }              from './config'
import { startApplication }       from './config'
import { FastifyAdapter }         from '@nestjs/platform-fastify'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { RedisIoAdapter }         from '@/wss/redis-io.adapter'

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false })
  )

  setupCors(app)

  const env = app.get(EnvService)

  app.setGlobalPrefix(env.server.prefix)
  app.enableShutdownHooks()

  const redisIoAdapter = new RedisIoAdapter(app)
  await redisIoAdapter.connectToRedis()

  app.useWebSocketAdapter(redisIoAdapter)

  await startApplication(app)
}

void bootstrap()

process.once('SIGUSR2', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
