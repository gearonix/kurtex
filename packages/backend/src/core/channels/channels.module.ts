import { Module }             from '@nestjs/common'
import { CqrsModule }         from '@nestjs/cqrs'
import { CommandHandlers }    from '@core/channels/application/commands'
import { EventHandlers }      from '@core/channels/application/events'
import { MongooseModule }     from '@nestjs/mongoose'
import { ModuleEntities }     from '@core/channels/domain/entities'
import { Gateways }           from '@core/channels/presenation/gateways'
import { Controllers }        from '@core/channels/presenation/controller'
import { Repositories }       from '@core/channels/infrastracture/repositories'

@Module({
  controllers: [...Controllers],
  imports: [CqrsModule, MongooseModule.forFeature(ModuleEntities)],
  providers: [
    ...Gateways,
    ...CommandHandlers,
    ...EventHandlers,
    ...Repositories
  ]
})
export class ChannelsModule {}
