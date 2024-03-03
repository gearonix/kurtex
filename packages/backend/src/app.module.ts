import { Module } from '@nestjs/common'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { ScheduleModule } from '@nestjs/schedule'
import { ZodValidationPipe } from 'nestjs-zod'
import { CoreModule } from '@/core'
import { DatabaseModule } from '@/database'
import { HttpExceptionFilter } from '@/filters'
import { GraphQLModule } from '@/graphql'
import { HealthModule } from '@/healthz/health.module'
import { RedisModule } from '@/redis'
import { EnvModule } from './env'
import { LoggerModule } from './logger'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EnvModule,
    GraphQLModule,
    LoggerModule,
    HealthModule,
    RedisModule,
    CoreModule,
    DatabaseModule
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
