import { Socket }   from 'socket.io'
import { Nullable } from '@grnx-utils/types'

export class UserConnectedEvent {
  constructor(
    public readonly client: Socket,
    public readonly roomId: Nullable<string>,
    public readonly members: string[]
  ) {}
}
