import { Socket }                      from 'socket.io'
import { LoggerService }               from '@/logger'
import { ConnectedSocketId }           from '@/decorators'
import { WsGateway }                   from '@/decorators'
import { WebsocketGateways }           from '@/config'
import { WebsocketGatewayFactory }     from '@/wss/websocket-gateway.factory'
import { ConnectedSocket }             from '@nestjs/websockets'
import { MessageBody }                 from '@nestjs/websockets'
import { CommandBus }                  from '@nestjs/cqrs'
import { ConnectUserCommand }          from '@core/channels/application'
import { LeaveRoomCommand }            from '@core/channels/application'
import { RelayIceCandidateCommand }    from '@core/channels/application'
import { RelaySdpMetadataCommand }     from '@core/channels/application'
import { channelGatewayMethods }       from '@kurtex/contracts'
import { ChannelGatewayMethods }       from '@kurtex/contracts'
import { ConnectUserRequest }          from '@kurtex/contracts'
import { ConnectUserRequestDto }       from '@kurtex/contracts'
import { LeaveRoomRequest }            from '@kurtex/contracts'
import { RelayIceCandidateRequest }    from '@kurtex/contracts'
import { RelayIceCandidateRequestDto } from '@kurtex/contracts'
import { RelaySdpMetadataRequest }     from '@kurtex/contracts'
import { RelaySdpMetadataRequestDto }  from '@kurtex/contracts'
import { WebsocketTopic }              from '@core/channels/shared/decorators'

@WsGateway(WebsocketGateways.RTC)
export class RtcGateway extends WebsocketGatewayFactory<ChannelGatewayMethods> {
  constructor(
    protected readonly logger: LoggerService,
    private readonly commandBus: CommandBus
  ) {
    super(logger, channelGatewayMethods)
  }

  // TODO: remove this method
  private async getValidWebsocketChannels() {
    const validChannels = await this.server.fetchSockets()

    return validChannels.map((socket) => ({
      id: socket.id
    }))
  }

  // TODO: remove this method
  override async handleConnection(client: Socket) {
    this.logger.info(`WssGateway: client connected: ${client.id}`)

    const validChannels = await this.getValidWebsocketChannels()

    this.reply({
      client,
      payload: validChannels,
      method: 'channelsReceived'
    })
  }

  override async handleDisconnect(client: Socket) {
    return this.commandBus.execute(new LeaveRoomCommand(client))
  }

  @WebsocketTopic(LeaveRoomRequest.topic)
  public async leaveRoom(@ConnectedSocket() client: Socket) {
    return this.handleDisconnect(client)
  }

  @WebsocketTopic(ConnectUserRequest.topic)
  public async joinWebRTCRoom(
    @MessageBody() handshake: ConnectUserRequestDto,
    @ConnectedSocket() client: Socket
  ) {
    return this.commandBus.execute(
      new ConnectUserCommand(handshake.roomId, client)
    )
  }

  @WebsocketTopic(RelaySdpMetadataRequest.topic)
  public async relaySdpMetadata(
    @MessageBody() handshake: RelaySdpMetadataRequestDto,
    @ConnectedSocketId() socketId: string
  ) {
    return this.commandBus.execute(
      new RelaySdpMetadataCommand(
        socketId,
        handshake.peerId,
        handshake.metadata
      )
    )
  }

  @WebsocketTopic(RelayIceCandidateRequest.topic)
  public async relayIceCandidate(
    @MessageBody() handshake: RelayIceCandidateRequestDto,
    @ConnectedSocketId() socketId: string
  ) {
    return this.commandBus.execute(
      new RelayIceCandidateCommand(
        socketId,
        handshake.peerId,
        handshake.iceCandidate
      )
    )
  }
}
