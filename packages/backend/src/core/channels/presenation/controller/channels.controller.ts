import {Controller, Get} from '@nestjs/common'
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
