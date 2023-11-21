import { Socket } from 'socket.io'

export class UserConnectedEvent {
  constructor(
    public readonly client: Socket,
    public readonly roomId: string,
    public readonly members: string[]
  ) {}
}
