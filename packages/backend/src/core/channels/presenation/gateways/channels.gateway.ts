import { Socket }                  from 'socket.io'
import { LoggerService }           from '@/logger'
import { WsGateway }               from '@/decorators'
import { WebsocketGateways }       from '@/config'
import { WebsocketGatewayFactory } from '@/wss/websocket-gateway.factory'
import { ChannelsMethodsKeys }   from '@core/channels/shared/ws'
import { ChannelGatewayMethods } from '@core/channels/shared/ws'

@WsGateway(WebsocketGateways.CHANNELS)
export class ChannelsGateway extends WebsocketGatewayFactory<ChannelsMethodsKeys> {
  constructor(protected readonly logger: LoggerService) {
    super(logger, ChannelGatewayMethods)
  }

  private async getValidWebsocketChannels() {
    const validChannels = await this.server.fetchSockets()

    const simplifiedChannels = validChannels.map((socket) => ({
      id: socket.id
    }))

    return simplifiedChannels
  }

  override async handleConnection(client: Socket) {
    this.logger.info(`WssGateway: client connected: ${client.id}`)

    const validChannels = await this.getValidWebsocketChannels()

    this.send(client, {
      payload: validChannels,
      method: 'channelsReceived'
    })
  }
}
