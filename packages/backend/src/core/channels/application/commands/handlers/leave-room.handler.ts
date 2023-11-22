import { CommandHandler }    from '@nestjs/cqrs'
import { ICommandHandler }   from '@nestjs/cqrs'
import { RtcGateway }        from '@core/channels/presenation'
import { LeaveRoomCommand }  from '@core/channels/application'
import { LeaveRoomContract } from '@kurtex/contracts'

@CommandHandler(LeaveRoomCommand)
export class LeaveRoomHandler implements ICommandHandler<LeaveRoomCommand> {
  constructor(private readonly gateway: RtcGateway) {}

  public async execute({ client }: LeaveRoomCommand) {
    const clientRooms = this.gateway.getValidClientRooms(client)

    /**
     * Basically it is 1-2 rooms maximum,
     * so this solution is acceptable
     */
    clientRooms.forEach((roomId) => {
      this.gateway.reply({
        receiver: roomId,
        method: LeaveRoomContract.topic.response,
        payload: {
          peerId: client.id
        }
      })

      client.leave(roomId)
    })
  }
}
