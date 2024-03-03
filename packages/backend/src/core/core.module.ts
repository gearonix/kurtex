import { ChannelsModule } from '@core/channels'
import { Module } from '@nestjs/common'

@Module({
  imports: [ChannelsModule]
})
export class CoreModule {}
