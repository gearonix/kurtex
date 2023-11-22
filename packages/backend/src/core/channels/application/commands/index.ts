import { ConnectUserHandler }       from './handlers/connect-user.handler'
import { RelayIceCandidateHandler } from './handlers/relay-ice-candidate.handler'
import { LeaveRoomHandler }         from './handlers/leave-room.handler'
import { RelaySdpMetadataHandler }  from './handlers/relay-sdp-metadata.handler'

export const CommandHandlers = [
  ConnectUserHandler,
  RelayIceCandidateHandler,
  LeaveRoomHandler,
  RelaySdpMetadataHandler
]
