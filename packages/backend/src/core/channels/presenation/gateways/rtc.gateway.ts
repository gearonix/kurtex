import { Socket }                    from 'socket.io'
import { LoggerService }             from '@/logger'
import { ConnectedSocketId }         from '@/decorators'
import { WsGateway }                 from '@/decorators'
import { WebsocketGateways }         from '@/config'
import { WebsocketGatewayFactory }   from '@/wss/websocket-gateway.factory'
import { ConnectedSocket }           from '@nestjs/websockets'
import { MessageBody }               from '@nestjs/websockets'
import { SubscribeMessage }          from '@nestjs/websockets'
import { CommandBus }                from '@nestjs/cqrs'
import { ConnectUserCommand }        from '@core/channels/application'
import { LeaveRoomCommand }          from '@core/channels/application'
import { RelayIceCandidateCommand }  from '@core/channels/application'
import { RelaySdpMetadataCommand }   from '@core/channels/application'
import { ConnectUserContract }       from '@kurtex/contracts'
import { LeaveRoomContract }         from '@kurtex/contracts'
import { RelaySdpMetadataContract }  from '@kurtex/contracts'
import { channelGatewayMethods }     from '@kurtex/contracts'
import { ChannelGatewayMethods }     from '@kurtex/contracts'
import { RelayIceCandidateContract } from '@kurtex/contracts'

@WsGateway(WebsocketGateways.RTC)
export class RtcGateway extends WebsocketGatewayFactory<ChannelGatewayMethods> {
  constructor(
    protected readonly logger: LoggerService,
    private readonly commandBus: CommandBus
  ) {
    super(logger, channelGatewayMethods)
  }

  private async getValidWebsocketChannels() {
    const validChannels = await this.server.fetchSockets()

    const simplifiedChannels = validChannels.map((socket) => ({
      id: socket.id
    }))

    return simplifiedChannels
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

  @SubscribeMessage(LeaveRoomContract.topic.requestw)
  public async leaveRoom(@ConnectedSocket() client: Socket) {
    return this.handleDisconnect(client)
  }

  @SubscribeMessage(ConnectUserContract.topic.request)
  public async joinWebRTCRoom(
    // TODO: refactor
    @MessageBody() handshake: any,
    @ConnectedSocket() client: Socket
  ) {
    return this.commandBus.execute(
      new ConnectUserCommand(handshake.roomId, client)
    )
  }

  @SubscribeMessage(RelaySdpMetadataContract.topic.request)
  public async relaySdpMetadata(
    @MessageBody() handshake: any,
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

  @SubscribeMessage(RelayIceCandidateContract.topic.response)
  public async relayIceCandidate(
    @MessageBody() handshake: any,
    @ConnectedSocketId() socketId: string
  ) {
    return this.commandBus.execute(
      new RelayIceCandidateCommand(
        socketId,
        handshake.peerId,
        handshake.metadata
      )
    )
  }
}
