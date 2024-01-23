import { RtcConnectionsRepository } from '@core/channels/infrastracture/repositories'
import { Query }                    from '@nestjs/graphql'
import { Resolver }                 from '@nestjs/graphql'
import { channels }                 from '@kurtex/contracts'

@Resolver('RtcConnection')
export class ChannelsResolver {
  constructor(
    private readonly rtcConnectionsRepository: RtcConnectionsRepository
  ) {}

  @Query(channels.GetRtcChannelsRequest.operation)
  public async getAllChannels() {
    return this.rtcConnectionsRepository.getLatestRtcConnections()
  }
}
