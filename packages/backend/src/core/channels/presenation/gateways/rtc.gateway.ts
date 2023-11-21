import { Socket }                  from 'socket.io'
import { LoggerService }           from '@/logger'
import { WsGateway }               from '@/decorators'
import { WebsocketGateways }       from '@/config'
import { WebsocketGatewayFactory } from '@/wss/websocket-gateway.factory'
import { ChannelsMethodsKeys }     from '@core/channels/shared/ws'
import { ChannelGatewayMethods }   from '@core/channels/shared/ws'
import { ConnectedSocket }         from '@nestjs/websockets'
import { MessageBody }             from '@nestjs/websockets'
import { SubscribeMessage }        from '@nestjs/websockets'
import { CommandBus }              from '@nestjs/cqrs'
import { ConnectUserCommand }      from '@core/channels/application'

@WsGateway(WebsocketGateways.RTC)
export class RtcGateway extends WebsocketGatewayFactory<ChannelsMethodsKeys> {
  constructor(
    protected readonly logger: LoggerService,
    private readonly commandBus: CommandBus
  ) {
    super(logger, ChannelGatewayMethods)
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

    this.send({
      client,
      payload: validChannels,
      method: 'channelsReceived'
    })
  }

  @SubscribeMessage(ChannelGatewayMethods.joinRoom)
  public async joinWebRTCRoom(
    @MessageBody() handshake: any,
    @ConnectedSocket() client: Socket
  ) {
    return this.commandBus.execute(
      new ConnectUserCommand(handshake.roomId, client)
    )
  }
}
