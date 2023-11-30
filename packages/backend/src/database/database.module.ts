import { Global }                 from '@nestjs/common'
import { Module }                 from '@nestjs/common'
import { MongooseModule }         from '@nestjs/mongoose'
import { MongooseConfigService }  from './database-config.service'
import { DatabaseUtilityService } from './database-utility.service'

@Global()
@Module({
  exports: [MongooseConfigService, DatabaseUtilityService],
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    })
  ],
  providers: [MongooseConfigService, DatabaseUtilityService]
})
export class DatabaseModule {}
