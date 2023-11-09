import { Module }         from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { EnvModule }      from './env'
import { LoggerModule }   from './logger'

@Module({
  imports: [ScheduleModule.forRoot(), EnvModule, LoggerModule]
})
export class AppModule {}
