import { Socket } from 'socket.io'

export class ConnectUserCommand {
  constructor(
    public readonly roomId: string,
    public client: Socket
  ) {}
}
