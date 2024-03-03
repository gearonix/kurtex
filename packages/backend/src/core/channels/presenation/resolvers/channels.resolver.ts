import { RtcConnectionsRepository } from '@core/channels/infrastracture/repositories'
import { channels } from '@kurtex/contracts'
import { Query, Resolver } from '@nestjs/graphql'

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
