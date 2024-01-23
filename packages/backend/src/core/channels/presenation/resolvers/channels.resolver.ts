import { RtcConnectionsRepository } from '@core/channels/infrastracture/repositories'
import { Query }                    from '@nestjs/graphql'
import { Resolver }                 from '@nestjs/graphql'

@Resolver('RtcConnection')
export class ChannelsResolver {
  constructor(
    private readonly rtcConnectionsRepository: RtcConnectionsRepository
  ) {}

  @Query('getAllChannels')
  public async getAllChannels() {
    return this.rtcConnectionsRepository.getLatestRtcConnections()
  }
}
