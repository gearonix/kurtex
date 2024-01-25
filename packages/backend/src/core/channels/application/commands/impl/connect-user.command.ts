import { Socket }   from 'socket.io'
import { Nullable } from '@kurtex/std'

export class ConnectUserCommand {
  constructor(
    public readonly roomId: Nullable<string>,
    public client: Socket
  ) {}
}
