import { Module }              from '@nestjs/common'
import { ScheduleModule }      from '@nestjs/schedule'
import { EnvModule }           from './env'
import { LoggerModule }        from './logger'
import { ZodValidationPipe }   from 'nestjs-zod'
import { APP_FILTER }          from '@nestjs/core'
import { APP_PIPE }            from '@nestjs/core'
import { HttpExceptionFilter } from '@/filters'
import { HealthModule }        from '@/healthz/health.module'

@Module({
  imports: [ScheduleModule.forRoot(), EnvModule, LoggerModule, HealthModule],
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
