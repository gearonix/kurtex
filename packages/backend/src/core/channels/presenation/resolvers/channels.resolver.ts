import { Controller }               from '@nestjs/common'
import { Get }                      from '@nestjs/common'
import { RtcConnectionsRepository } from '@core/channels/infrastracture/repositories'
import {Mutation, Query} from '@nestjs/graphql'
import { Resolver }                 from '@nestjs/graphql'

@Resolver('RtcConnection')
export class ChannelsResolver {
  constructor(
    private readonly rtcConnectionsRepository: RtcConnectionsRepository
  ) {}

  @Query('getAllChannels')
  getAllChannels() {
    return this.rtcConnectionsRepository.getLatestRtcConnections()
  }
}
