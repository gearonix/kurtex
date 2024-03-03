import { RelaySdpMetadataCommand } from '@core/channels/application/commands/impl'
import { RtcGateway } from '@core/channels/presenation/gateways'
import { RelaySdpMetadataResponse } from '@kurtex/contracts'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

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
