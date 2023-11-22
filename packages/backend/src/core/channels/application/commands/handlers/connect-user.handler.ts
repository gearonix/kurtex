import { CommandHandler }     from '@nestjs/cqrs'
import { EventBus }           from '@nestjs/cqrs'
import { ICommandHandler }    from '@nestjs/cqrs'
import { RtcGateway }         from '@core/channels/presenation'
import { WsException }        from '@nestjs/websockets'
import { ConnectUserCommand } from '@core/channels/application'
import { UserConnectedEvent } from '@core/channels/application'

@CommandHandler(ConnectUserCommand)
export class ConnectUserHandler implements ICommandHandler<ConnectUserCommand> {
  constructor(
    // private readonly gateway: RtcGateway,
    // private readonly eventBus: EventBus
  ) {}

  public async execute({ client, roomId }: ConnectUserCommand) {
    // if (client.rooms.has(roomId)) {
    //   throw new WsException(
    //     `User with ${client.id} already joined to room ${roomId}.`
    //   )
    // }
    //
    // client.join(roomId)
    //
    // const roomMembers = this.gateway.getRoomMembers(roomId)
    //
    // const userConnected = new UserConnectedEvent(client, roomId, roomMembers)
    //
    // this.eventBus.publish(userConnected)
  }
}
