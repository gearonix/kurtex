import { OnGatewayConnection } from '@nestjs/websockets'
import { WebSocketServer }     from '@nestjs/websockets'
import { Server }              from 'socket.io'
import { Socket }              from 'socket.io'
import { LoggerService }       from '@/logger'
import { WsGateway }           from '@/decorators'
import { WebsocketGateways }   from '@/config'

@WsGateway(WebsocketGateways.CHANNELS)
export class RegisterChannelsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server

  constructor(private readonly logger: LoggerService) {}

  handleConnection(client: Socket) {
    this.logger.info(`Client connected: ${client.id}`)
  }
}
