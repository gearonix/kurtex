import { EventsHandler }      from '@nestjs/cqrs'
import { IEventHandler }      from '@nestjs/cqrs'
import { UserConnectedEvent } from '@core/channels/application/events/impl/user-connected.event'
import { RtcGateway }    from '@core/channels/presenation'

@EventsHandler(UserConnectedEvent)
export class UserConnectedHandler implements IEventHandler<UserConnectedEvent> {
  constructor(private readonly gateway: RtcGateway) {}

  handle(event: UserConnectedEvent) {
    this.gateway.send({
      method: 'userConnected',
      receiver: event.roomId,
      payload: {
        peerId: event.client.id,
        shouldCreateOffer: false
      }
    })

    this.gateway.send({
      method: 'userConnected',
      payload: {
        client: event.client,
        peerMembers: event.members,
        shouldCreateOffer: true
      }
    })
  }
}
