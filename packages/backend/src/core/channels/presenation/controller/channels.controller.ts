import { Controller }               from '@nestjs/common'
import { Get }                      from '@nestjs/common'
import { RtcConnectionsRepository } from '@core/channels/infrastracture/repositories'

@Controller('channels')
export class ChannelsController {
  constructor(
    private readonly rtcConnectionsRepository: RtcConnectionsRepository
  ) {}

  @Get()
  getAllChannels() {
    return this.rtcConnectionsRepository.getLatestRtcConnections()
  }
}
