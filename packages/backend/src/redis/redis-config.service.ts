import { Injectable }          from '@nestjs/common'
import { CacheModuleOptions }  from '@nestjs/common/cache'
import { CacheStore }          from '@nestjs/common/cache'
import { CacheOptionsFactory } from '@nestjs/common/cache'
import { EnvService }          from '@/env'
import * as redisStore         from 'cache-manager-redis-store'

@Injectable()
export class RedisConfigService implements CacheOptionsFactory {
  constructor(private readonly envService: EnvService) {}

  public get configuration() {
    return this.envService.redis
  }

  public createCacheOptions(): CacheModuleOptions {
    return {
      ttl: 60,
      isGlobal: true,
      store: redisStore as unknown as CacheStore,
      host: this.configuration.host,
      port: this.configuration.port
    }
  }
}
