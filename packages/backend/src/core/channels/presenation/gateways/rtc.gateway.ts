import { commands } from '@core/channels/application/commands/impl'
import { RtcConnection } from '@core/channels/domain/entities'
import { WebsocketTopic } from '@core/channels/shared'
import {
  ChannelGatewayMethods,
  rtcGatewayMethods,
  webrtc as contracts
} from '@kurtex/contracts'
import { CommandBus } from '@nestjs/cqrs'
import { InjectModel } from '@nestjs/mongoose'
import { ConnectedSocket, MessageBody } from '@nestjs/websockets'
import { Model } from 'mongoose'
import { Socket } from 'socket.io'
import { WebsocketGateways } from '@/config'
import { ConnectedSocketId, WsGateway } from '@/decorators'
import { LoggerService } from '@/logger'
import { WebsocketGatewayFactory } from '@/wss'

@WsGateway(WebsocketGateways.RTC)
export class RtcGateway extends WebsocketGatewayFactory<ChannelGatewayMethods> {
  constructor(
    protected readonly logger: LoggerService,
    private readonly commandBus: CommandBus
  ) {
    super(logger, rtcGatewayMethods)
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
