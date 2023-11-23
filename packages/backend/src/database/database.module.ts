import { Module }                from '@nestjs/common'
import { MongooseModule }        from '@nestjs/mongoose'
import { MongooseConfigService } from '@/database/database-config.service'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    })
  ],
  providers: [MongooseConfigService],
  exports: [MongooseConfigService]
})
export class DatabaseModule {}
