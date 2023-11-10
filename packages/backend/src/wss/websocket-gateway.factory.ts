import { OnGatewayConnection } from '@nestjs/websockets'
import { OnGatewayDisconnect } from '@nestjs/websockets'
import { WebSocketServer }     from '@nestjs/websockets'

import { Server }              from 'socket.io'
import { Socket }              from 'socket.io'

import { WsGateway }           from '@/decorators'
import { LoggerService }       from '@/logger'
import { AnyObject }           from '@grnx-utils/types'

@WsGateway()
export abstract class WebsocketGatewayFactory
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  protected server: Server

  constructor(protected readonly logger: LoggerService) {}

  private getClientQuery<T extends AnyObject>(client: Socket): T {
    return client.handshake.query as T
  }

  public broadcastAll(event: string, message: AnyObject) {
    this.server.emit(event, message)
  }

  public async handleConnection(client: Socket) {
    this.logger.info(`WssGateway: client connected: ${client.id}`)
  }

  public async handleDisconnect(client: Socket) {
    this.logger.info(`WssGateway: client disconnected: ${client.id}`)
  }
}
