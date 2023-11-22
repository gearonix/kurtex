import { CommandHandler }           from '@nestjs/cqrs'
import { ICommandHandler }          from '@nestjs/cqrs'
import { RtcGateway }               from '@core/channels/presenation'
import { RelaySdpMetadataResponse } from '@kurtex/contracts'
import { RelaySdpMetadataCommand }  from '@core/channels/application/commands/impl'

@CommandHandler(RelaySdpMetadataCommand)
export class RelaySdpMetadataHandler
  implements ICommandHandler<RelaySdpMetadataCommand>
{
  constructor(private readonly gateway: RtcGateway) {}

  public async execute({
    metadata,
    peerId,
    clientId
  }: RelaySdpMetadataCommand) {
    this.gateway.reply({
      payload: {
        peerId: clientId,
        metadata
      },
      method: RelaySdpMetadataResponse.topic,
      receiver: peerId
    })
  }
}
