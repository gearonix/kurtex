import { RelayIceCandidateCommand } from '@core/channels/application/commands/impl'
import { RtcGateway } from '@core/channels/presenation/gateways'
import { RelayIceCandidateResponse } from '@kurtex/contracts'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

@CommandHandler(RelayIceCandidateCommand)
export class RelayIceCandidateHandler
  implements ICommandHandler<RelayIceCandidateCommand>
{
  constructor(private readonly gateway: RtcGateway) {}

  public async execute({
    iceCandidate,
    peerId,
    clientId
  }: RelayIceCandidateCommand) {
    this.gateway.reply({
      payload: {
        peerId: clientId,
        iceCandidate
      },
      method: RelayIceCandidateResponse.topic,
      receiver: peerId
    })
  }
}
