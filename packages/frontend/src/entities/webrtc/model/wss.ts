import { forward }                   from 'effector'
import { sample }                    from 'effector'
import { scope }                     from '@grnx/effector-socket.io'
import { roomsListModel }            from '@/widgets/connected-rooms-list'
import { JoinRoom }                  from './lib/interfaces'
import { RelayIceCandidateParams }   from './lib/interfaces'
import { RelaySdpParams }            from './lib/interfaces'
import { $peerConnections }          from './peer-connections'
import { addIceCandidateFx }         from './effects'
import { addRTCPeerConnectionFx }    from './effects'
import { atom }                      from '@/shared/factory/atom'
import { addSessionDescriptionFx }   from './effects'
import { ConnectUserContract }       from '@kurtex/contracts'
import { LeaveRoomContract }         from '@kurtex/contracts'
import { RelayIceCandidateContract } from '@kurtex/contracts'
import { RelaySdpMetadataContract }  from '@kurtex/contracts'

export const wss = atom(() => {
  const socket = scope(roomsListModel.socket)

  const joinRoom = socket.publisher<JoinRoom>('joinRoom')

  const leaveRoom = socket.publisher('leaveRoom')

  const relayIceCandidate =
    socket.publisher<RelayIceCandidateParams>('relayIceCandidate')
  const relaySdpMetadata = socket.publisher<RelaySdpParams>('relaySdp')

  const userConnected = socket.event('userConnected', {
    schema: ConnectUserContract.schema
  })

  const sessionDescriptionReceived = socket.event(
    'sessionDescriptionReceived',
    {
      schema: RelaySdpMetadataContract.schema
    }
  )

  const iceCandidateReceived = socket.event('iceCandidateReceived', {
    schema: RelayIceCandidateContract.schema
  })

  const userDisconnected = socket.event('userDisconnected', {
    schema: LeaveRoomContract.schema
  })

  return {
    joinRoom,
    leaveRoom,
    relayIceCandidate,
    relaySdpMetadata,
    sessionDescriptionReceived,
    iceCandidateReceived,
    userConnected,
    userDisconnected,
    Gate: socket.Gate
  }
})

/* events */

sample({
  clock: wss.userConnected,
  source: $peerConnections,
  filter: (connections, { peerId }) => !(peerId in connections),
  fn: (_, ctx) => ctx,
  target: addRTCPeerConnectionFx
})

forward({
  from: wss.sessionDescriptionReceived,
  to: addSessionDescriptionFx
})

forward({
  from: wss.iceCandidateReceived,
  to: addIceCandidateFx
})
