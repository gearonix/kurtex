import { Module }          from '@nestjs/common'
import { CqrsModule }      from '@nestjs/cqrs'
import { CommandHandlers } from '@core/channels/application/commands'
import { EventHandlers }   from '@core/channels/application/events'
import { MongooseModule }  from '@nestjs/mongoose'
import { ModuleEntities }  from '@core/channels/domain/entities'
import { Gateways }        from '@core/channels/presenation/gateways'
import { Repositories }    from '@core/channels/infrastracture/repositories'
import { Resolvers }       from '@core/channels/presenation/resolvers'

@Module({
  controllers: [],
  imports: [CqrsModule, MongooseModule.forFeature(ModuleEntities)],
  providers: [
    ...Gateways,
    ...CommandHandlers,
    ...EventHandlers,
    ...Repositories,
    ...Resolvers
  ]
})
export class ChannelsModule {}
