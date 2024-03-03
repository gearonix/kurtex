import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { RedisConfigService } from '@/redis/redis-config.service'

@Module({
  exports: [RedisConfigService],
  imports: [
    CacheModule.registerAsync({
      useClass: RedisConfigService
    })
  ],
  providers: [RedisConfigService]
})
export class RedisModule {}
