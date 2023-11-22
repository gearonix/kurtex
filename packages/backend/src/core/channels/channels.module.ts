import { Module }          from '@nestjs/common'
import { RtcGateway }      from '@core/channels/presenation'
import { CqrsModule }      from '@nestjs/cqrs'
import { CommandHandlers } from '@core/channels/application/commands'
import { EventHandlers }   from '@core/channels/application/events'

@Module({
  imports: [CqrsModule],
  providers: [RtcGateway, ...CommandHandlers, ...EventHandlers]
})
export class ChannelsModule {}
