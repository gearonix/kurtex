import { Socket } from 'socket.io'

export class LeaveRoomCommand {
  constructor(public readonly client: Socket) {}
}
