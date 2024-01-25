import { Socket }   from 'socket.io'
import { Nullable } from '@kurtex/std'

export class UserConnectedEvent {
  constructor(
    public readonly client: Socket,
    public readonly roomId: Nullable<string>,
    public readonly members: string[]
  ) {}
}
