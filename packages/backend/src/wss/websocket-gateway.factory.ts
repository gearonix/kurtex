import { AnyObject, Nullable } from '@kurtex/std'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { validate } from 'uuid'
import { WsGateway } from '@/decorators'
import { LoggerService } from '@/logger'
import { FactorySendParams } from '@/wss/wss.interfaces'

@WsGateway()
export abstract class WebsocketGatewayFactory<
    Methods extends Record<string, string>
  >
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  protected server: Server

  constructor(
    protected readonly logger: LoggerService,
    protected readonly methods: Methods
  ) {}

  public getServer() {
    return this.server
  }

  private getClientQuery<T extends AnyObject>(client: Socket): T {
    return client.handshake as unknown as T
  }

  public broadcastAll(event: string, message: AnyObject) {
    this.server.emit(event, message)
  }

  public getValidClientRooms(client: Socket) {
    return [...client.rooms].filter(validate)
  }

  public getRoomMembers(roomId: Nullable<string>) {
    if (!roomId) return []

    const adapter = this.server.sockets.adapter

    const members = adapter.rooms.get(roomId)

    if (!members) return []
    /**
     *  socket.io members is Set() by default
     * */
    return Array.from(members)
  }

  public async handleConnection(client: Socket) {
    this.logger.info(`WssGateway: client connected: ${client.id}`)
  }

  public async handleDisconnect(client: Socket) {
    this.logger.info(`WssGateway: client disconnected: ${client.id}`)
  }

  public reply<T>({
    client,
    method,
    payload,
    receiver
  }: FactorySendParams<T, Methods>) {
    const wsMethod = this.methods[method]

    const dataToSend = {
      payload,
      timestamp: Date.now()
    }

    this.logger.info(`WssGateway: Sending the method ${wsMethod}`)

    if (client) {
      return client.emit(wsMethod, dataToSend)
    }

    if (receiver) {
      return this.server.to(receiver).emitWithAck(wsMethod, dataToSend)
    }

    this.logger.alert(
      'WssGateway: receiver or client properties are not provided'
    )
  }
}
