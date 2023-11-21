import { Module }          from '@nestjs/common'
import { RtcGateway } from '@core/channels/presenation'
import { CommandHandlers } from '@core/channels/application'
import { EventHandlers }   from '@core/channels/application'
import { CqrsModule }      from '@nestjs/cqrs'

@Module({
  imports: [CqrsModule],
  providers: [RtcGateway, ...CommandHandlers, ...EventHandlers]
})
export class ChannelsModule {}
