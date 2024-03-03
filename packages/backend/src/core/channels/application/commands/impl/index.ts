import { ConnectUserCommand } from './connect-user.command'
import { LeaveRoomCommand } from './leave-room.command'
import { RelayIceCandidateCommand } from './relay-ice-candidate.command'
import { RelaySdpMetadataCommand } from './relay-sdp-metadata.command'

export const commands = {
  ConnectUserCommand,
  LeaveRoomCommand,
  RelaySdpMetadataCommand,
  RelayIceCandidateCommand
}

export {
  ConnectUserCommand,
  LeaveRoomCommand,
  RelayIceCandidateCommand,
  RelaySdpMetadataCommand
}
