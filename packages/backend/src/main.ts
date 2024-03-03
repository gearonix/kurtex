import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { RedisIoAdapter } from '@/wss/redis-io.adapter'
import { AppModule } from './app.module'
import { setupCors, startApplication } from './config'
import { EnvService } from './env'

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false })
  )

  setupCors(app)

  const env = app.get(EnvService)

  app.setGlobalPrefix(env.server.prefix)
  app.enableShutdownHooks()

  const redisIoAdapter = new RedisIoAdapter(app, env)

  await redisIoAdapter.connectToRedis()

  app.useWebSocketAdapter(redisIoAdapter)

  await startApplication(app)
}

void bootstrap()

process.once('SIGUSR2', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
