import { EventsHandler }       from '@nestjs/cqrs'
import { IEventHandler }       from '@nestjs/cqrs'
import { RtcGateway }          from '@core/channels/presenation/gateways'
import { ConnectUserResponse } from '@kurtex/contracts'
import { UserConnectedEvent }  from '@core/channels/application/events/impl'

@EventsHandler(UserConnectedEvent)
export class UserConnectedHandler implements IEventHandler<UserConnectedEvent> {
  constructor(private readonly gateway: RtcGateway) {}

  handle(event: UserConnectedEvent) {
    this.gateway.reply({
      method: ConnectUserResponse.topic,
      receiver: event.roomId,
      payload: {
        peerId: event.client.id,
        shouldCreateOffer: false
      }
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
