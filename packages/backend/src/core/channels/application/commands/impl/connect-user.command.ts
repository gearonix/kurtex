import { Socket }   from 'socket.io'
import { Nullable } from '@grnx-utils/types'

export class ConnectUserCommand {
  constructor(
    public readonly roomId: Nullable<string>,
    public client: Socket
  ) {}
}
