import { ConnectUserHandler }   from './commands'
import { UserConnectedHandler } from './events'

export const CommandHandlers = [ConnectUserHandler]
export const EventHandlers = [UserConnectedHandler]

export * from './events'
export * from './commands'
