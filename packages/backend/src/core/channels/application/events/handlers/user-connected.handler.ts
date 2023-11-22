import { EventsHandler }       from '@nestjs/cqrs'
import { IEventHandler }       from '@nestjs/cqrs'
import { UserConnectedEvent }  from '@core/channels/application'
import { RtcGateway }          from '@core/channels/presenation'
import { ConnectUserContract } from '@kurtex/contracts'

@EventsHandler(UserConnectedEvent)
export class UserConnectedHandler implements IEventHandler<UserConnectedEvent> {
  constructor(private readonly gateway: RtcGateway) {}

  handle(event: UserConnectedEvent) {
    this.gateway.reply({
      method: ConnectUserContract.topic.response,
      receiver: event.roomId,
      payload: {
        peerId: event.client.id,
        shouldCreateOffer: false
      }
    })

    this.gateway.reply({
      method: ConnectUserContract.topic.response,
      payload: {
        client: event.client,
        peerMembers: event.members,
        shouldCreateOffer: true
      }
    })
  }
}
