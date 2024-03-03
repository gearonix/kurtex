import { CommandHandlers } from '@core/channels/application/commands'
import { EventHandlers } from '@core/channels/application/events'
import { ModuleEntities } from '@core/channels/domain/entities'
import { Repositories } from '@core/channels/infrastracture/repositories'
import { Gateways } from '@core/channels/presenation/gateways'
import { Resolvers } from '@core/channels/presenation/resolvers'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule } from '@nestjs/mongoose'

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
