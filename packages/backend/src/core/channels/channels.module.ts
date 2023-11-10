import { Module }                  from '@nestjs/common'
import { RegisterChannelsGateway } from '@core/channels/presenation'

@Module({
  providers: [RegisterChannelsGateway]
})
export class ChannelsModule {}
