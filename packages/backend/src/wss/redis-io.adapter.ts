import { IoAdapter }              from '@nestjs/platform-socket.io'
import { ServerOptions }          from 'socket.io'
import { createAdapter }          from '@socket.io/redis-adapter'
import { createClient }           from 'redis'
import { EnvService }             from '@/env'
import { Injectable }             from '@nestjs/common'
import { NestFastifyApplication } from '@nestjs/platform-fastify'

@Injectable()
export class RedisIoAdapter extends IoAdapter {
  constructor(
    private readonly application: NestFastifyApplication,
    private readonly env: EnvService
  ) {
    super(application)
  }

  private adapterConstructor: ReturnType<typeof createAdapter>

  public async connectToRedis(): Promise<void> {
    const { url } = this.getConnectionUri()

    const pubClient = createClient({ url })
    const subClient = pubClient.duplicate()

    await Promise.all([pubClient.connect(), subClient.connect()])

    this.adapterConstructor = createAdapter(pubClient, subClient)
  }

  override createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options)
    server.adapter(this.adapterConstructor)
    return server
  }

  public getConnectionUri() {
    return {
      url: `redis://${this.env.redis.host}:${this.env.redis.port}`
    }
  }
}
