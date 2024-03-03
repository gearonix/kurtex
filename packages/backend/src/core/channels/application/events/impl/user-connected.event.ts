import { Nullable } from '@kurtex/std'
import { Socket } from 'socket.io'

export class UserConnectedEvent {
  constructor(
    public readonly client: Socket,
    public readonly roomId: Nullable<string>,
    public readonly members: string[]
  ) {}
}
