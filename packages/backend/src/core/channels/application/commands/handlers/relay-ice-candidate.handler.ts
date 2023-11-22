import { CommandHandler }            from '@nestjs/cqrs'
import { ICommandHandler }           from '@nestjs/cqrs'
import { RtcGateway }                from '@core/channels/presenation'
import { RelayIceCandidateCommand }  from '@core/channels/application'
import { RelayIceCandidateResponse } from '@kurtex/contracts'

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
