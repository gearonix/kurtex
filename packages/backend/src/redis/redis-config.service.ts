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
      host: this.configuration.host,
      isGlobal: true,
      port: this.configuration.port,
      store: redisStore as unknown as CacheStore,
      ttl: 60
    }
  }
}
