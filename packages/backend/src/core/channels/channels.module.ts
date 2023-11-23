import { Module }          from '@nestjs/common'
import { RtcGateway }      from '@core/channels/presenation'
import { CqrsModule }      from '@nestjs/cqrs'
import { CommandHandlers } from '@core/channels/application/commands'
import { EventHandlers }   from '@core/channels/application/events'
import { MongooseModule }  from '@nestjs/mongoose'
import { ModuleEntities }  from '@core/channels/domain/entities'

@Module({
  imports: [CqrsModule, MongooseModule.forFeature(ModuleEntities)],
  providers: [RtcGateway, ...CommandHandlers, ...EventHandlers]
})
export class ChannelsModule {}
