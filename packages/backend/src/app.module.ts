import { Module }              from '@nestjs/common'
import { ScheduleModule }      from '@nestjs/schedule'
import { EnvModule }           from './env'
import { LoggerModule }        from './logger'
import { ZodValidationPipe }   from 'nestjs-zod'
import { APP_FILTER }          from '@nestjs/core'
import { APP_PIPE }            from '@nestjs/core'
import { HttpExceptionFilter } from '@/filters'
import { HealthModule }        from '@/healthz/health.module'
import { CacheModule }         from '@nestjs/cache-manager'
import { CoreModule }          from '@/core'
import * as redisStore         from 'cache-manager-redis-store'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EnvModule,
    LoggerModule,
    HealthModule,
    CacheModule.register({
      isGlobal: true,
      // TODO: refactor this
      store: redisStore as any,
      host: 'localhost',
      port: 6379
    }),
    CoreModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule {}
