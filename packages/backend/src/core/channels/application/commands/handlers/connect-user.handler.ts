import { ConnectUserCommand } from '@core/channels/application/commands/impl'
import { UserConnectedEvent } from '@core/channels/application/events/impl'
import { RtcConnectionsRepository } from '@core/channels/infrastracture/repositories'
import { RtcGateway } from '@core/channels/presenation/gateways'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { WsException } from '@nestjs/websockets'

@CommandHandler(ConnectUserCommand)
export class ConnectUserHandler implements ICommandHandler<ConnectUserCommand> {
  constructor(
    private readonly gateway: RtcGateway,
    private readonly eventBus: EventBus,
    private readonly rtcRepository: RtcConnectionsRepository
  ) {}

  public async execute({ client, roomId }: ConnectUserCommand) {
    if (client.rooms.has(roomId!)) {
      throw new WsException(
        `User with ${client.id} already joined
        to websocket room (RTC connection) ${roomId}.`
      )
    }

    const rtcConnectionId =
      await this.rtcRepository.createConnectionOrAddPeerId(client.id, roomId)

    client.join(rtcConnectionId)

    const roomMembers = this.gateway.getRoomMembers(roomId)

    const userConnected = new UserConnectedEvent(client, roomId, roomMembers)

    this.eventBus.publish(userConnected)
  }
}
