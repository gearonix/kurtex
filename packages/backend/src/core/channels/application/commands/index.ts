import { ConnectUserHandler }       from './handlers/connect-user.handler'
import { LeaveRoomHandler }         from './handlers/leave-room.handler'
import { RelayIceCandidateHandler } from './handlers/relay-ice-candidate.handler'
import { RelaySdpMetadataHandler }  from './handlers/relay-sdp-metadata.handler'

export * from './impl/connect-user.command'
export * from './impl/relay-ice-candidate.command'
export * from './impl/relay-sdp-metadata.command'
export * from './impl/leave-room.command'

export const CommandHandlers = [
  ConnectUserHandler,
  RelayIceCandidateHandler,
  RelaySdpMetadataHandler,
  LeaveRoomHandler
]
