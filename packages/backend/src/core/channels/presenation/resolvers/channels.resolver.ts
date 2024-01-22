import { RtcConnectionsRepository }      from '@core/channels/infrastracture/repositories'
import { Query }                         from '@nestjs/graphql'
import { Resolver }                      from '@nestjs/graphql'
import { ClassSerializerInterceptor }    from '@nestjs/common'
import { UseInterceptors }               from '@nestjs/common'
import { UsePipes }                      from '@nestjs/common'
import { ValidationPipe }                from '@nestjs/common'
import { GqlClassSerializerInterceptor } from '@/interceptors/gql-class-serializer.interceptor'

@Resolver('RtcConnection')
@UseInterceptors(GqlClassSerializerInterceptor)
// @UsePipes(
//   new ValidationPipe({
//     forbidNonWhitelisted: true,
//     transform: true,
//     whitelist: true
//   })
// )
export class ChannelsResolver {
  constructor(
    private readonly rtcConnectionsRepository: RtcConnectionsRepository
  ) {}

  @Query('getAllChannels')
  async getAllChannels() {
    return this.rtcConnectionsRepository.getLatestRtcConnections()
  }
}
