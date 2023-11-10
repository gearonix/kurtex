import { Module }         from '@nestjs/common'
import { ChannelsModule } from '@core/channels'

@Module({
  imports: [ChannelsModule]
})
export class CoreModule {}
