import { Module }             from '@nestjs/common'
import { CacheModule }        from '@nestjs/cache-manager'
import { RedisConfigService } from '@/redis/redis-config.service'

@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: RedisConfigService
    })
  ],
  providers: [RedisConfigService],
  exports: [RedisConfigService]
})
export class RedisModule {}
