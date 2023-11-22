import { ConnectUserHandler }       from './commands'
import { RelayIceCandidateHandler } from './commands'
import { RelaySdpMetadataHandler }  from './commands'
import { UserConnectedHandler }     from './events'

export * as commands from './commands'

export const CommandHandlers = [
  ConnectUserHandler,
  RelayIceCandidateHandler,
  RelaySdpMetadataHandler
]

export const EventHandlers = [UserConnectedHandler]

export * from './events'
export * from './commands'
