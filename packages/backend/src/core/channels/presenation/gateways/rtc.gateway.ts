import { Socket }                  from 'socket.io'
import { LoggerService }           from '@/logger'
import { ConnectedSocketId }       from '@/decorators'
import { WsGateway }               from '@/decorators'
import { WebsocketGateways }       from '@/config'
import { WebsocketGatewayFactory } from '@/wss'
import { ConnectedSocket }         from '@nestjs/websockets'
import { MessageBody }             from '@nestjs/websockets'
import { CommandBus }              from '@nestjs/cqrs'
import { rtcGatewayMethods }       from '@kurtex/contracts'
import { ChannelGatewayMethods }   from '@kurtex/contracts'
import { webrtc as contracts }     from '@kurtex/contracts'
import { WebsocketTopic }          from '@core/channels/shared'
import { commands }                from '@core/channels/application/commands/impl'
import { RtcConnection }           from '@core/channels/domain/entities'
import { Model }                   from 'mongoose'
import { InjectModel }             from '@nestjs/mongoose'

@WsGateway(WebsocketGateways.RTC)
export class RtcGateway extends WebsocketGatewayFactory<ChannelGatewayMethods> {
  constructor(
    protected readonly logger: LoggerService,
    private readonly commandBus: CommandBus,
    @InjectModel(RtcConnection.name)
    private readonly rtcModel: Model<RtcConnection>
  ) {
    super(logger, rtcGatewayMethods)
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
      method: 'channelsReceived',
      payload: validChannels
    })
  }

  override async handleDisconnect(client: Socket) {
    return this.commandBus.execute(new commands.LeaveRoomCommand(client))
  }

  @WebsocketTopic(contracts.LeaveRoomRequest.topic)
  public async leaveRoom(@ConnectedSocket() client: Socket) {
    return this.handleDisconnect(client)
  }

  @WebsocketTopic(contracts.ConnectUserRequest.topic)
  public async joinWebRTCRoom(
    @MessageBody() handshake: contracts.JoinRoom,
    @ConnectedSocket() client: Socket
  ) {
    return this.commandBus.execute(
      new commands.ConnectUserCommand(handshake.roomId, client)
    )
  }

  @WebsocketTopic(contracts.RelaySdpMetadataRequest.topic)
  public async relaySdpMetadata(
    @MessageBody() handshake: contracts.RelaySdp,
    @ConnectedSocketId() socketId: string
  ) {
    return this.commandBus.execute(
      new commands.RelaySdpMetadataCommand(
        socketId,
        handshake.peerId,
        handshake.metadata
      )
    )
  }

  @WebsocketTopic(contracts.RelayIceCandidateRequest.topic)
  public async relayIceCandidate(
    @MessageBody() handshake: contracts.RelayIceCandidate,
    @ConnectedSocketId() socketId: string
  ) {
    return this.commandBus.execute(
      new commands.RelayIceCandidateCommand(
        socketId,
        handshake.peerId,
        handshake.iceCandidate
      )
    )
  }
}
