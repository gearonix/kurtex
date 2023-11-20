import { Module }          from '@nestjs/common'
import { ChannelsGateway } from '@core/channels/presenation'

@Module({
  providers: [ChannelsGateway]
})
export class ChannelsModule {}
