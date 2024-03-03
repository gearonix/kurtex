import { Nullable } from '@kurtex/std'
import { Socket } from 'socket.io'

export class ConnectUserCommand {
  constructor(
    public readonly roomId: Nullable<string>,
    public client: Socket
  ) {}
}
