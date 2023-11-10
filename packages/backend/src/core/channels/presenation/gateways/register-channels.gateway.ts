import { Socket }                  from 'socket.io'
import { LoggerService }           from '@/logger'
import { WsGateway }               from '@/decorators'
import { WebsocketGateways }       from '@/config'
import { WebsocketGatewayFactory } from '@/wss/websocket-gateway.factory'

@WsGateway(WebsocketGateways.CHANNELS)
export class RegisterChannelsGateway extends WebsocketGatewayFactory {
  constructor(protected readonly logger: LoggerService) {
    super(logger)
  }

  private async getValidWebsocketChannels() {
    const channelKeys = await this.server.fetchSockets()
    console.log(channelKeys)

    // const validChannels = Array.from(channelKeys).filter(validate)

    return {
      ...channelKeys,
      id: '22'
    }
  }

  override async handleConnection(client: Socket) {
    this.logger.info(`WssGateway: client connected: ${client.id}`)

    const validChannels = await this.server.fetchSockets()

    const simplifiedChannels = validChannels.map((socket) => ({
      id: socket.id
    }))

    client.emit('channels.channels-received', {
      channels: simplifiedChannels,
      data: {
        sdfsdf: 'qweqw'
      }
    })
  }
}
