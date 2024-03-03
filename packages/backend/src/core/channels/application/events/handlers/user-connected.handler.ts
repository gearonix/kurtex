import { UserConnectedEvent } from '@core/channels/application/events/impl'
import { RtcGateway } from '@core/channels/presenation/gateways'
import { ConnectUserResponse } from '@kurtex/contracts'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

@EventsHandler(UserConnectedEvent)
export class UserConnectedHandler implements IEventHandler<UserConnectedEvent> {
  constructor(private readonly gateway: RtcGateway) {}

  handle(event: UserConnectedEvent) {
    this.gateway.reply({
      method: ConnectUserResponse.topic,
      payload: {
        peerId: event.client.id,
        shouldCreateOffer: false
      },
      receiver: event.roomId
    })

    this.gateway.reply({
      method: ConnectUserResponse.topic,
      payload: {
        client: event.client,
        peerMembers: event.members,
        shouldCreateOffer: true
      }
    })
  }
}
