import { forward }                   from 'effector'
import { sample }                    from 'effector'
import { scope }                     from '@grnx/effector-socket.io'
import { roomsListModel }            from '@/widgets/connected-rooms-list'
import { $peerConnections }          from './peer-connections'
import { addIceCandidateFx }         from './effects'
import { addRTCPeerConnectionFx }    from './effects'
import { addSessionDescriptionFx }   from './effects'
import { atom }                      from '@/shared/factory/atom'
import { ConnectUserResponse }       from '@kurtex/contracts'
import { LeaveRoom }                 from '@kurtex/contracts'
import { LeaveRoomResponse }         from '@kurtex/contracts'
import { RelayIceCandidate }         from '@kurtex/contracts'
import { RelayIceCandidateResponse } from '@kurtex/contracts'
import { RelaySdpMetadataResponse }  from '@kurtex/contracts'

export const wss = atom(() => {
  const socket = scope(roomsListModel.socket)

  const joinRoom = socket.publisher<RelayIceCandidate>('joinRoom')

  const leaveRoom = socket.publisher<LeaveRoom>('leaveRoom')

  const relayIceCandidate =
    socket.publisher<RelayIceCandidate>('relayIceCandidate')

  const relaySdpMetadata = socket.publisher<RelayIceCandidate>('relaySdp')

  const userConnected = socket.event('userConnected', {
    schema: ConnectUserResponse.schema
  })

  const metadataReceived = socket.event('metadataReceived', {
    schema: RelaySdpMetadataResponse.schema
  })

  const iceCandidateReceived = socket.event('iceCandidateReceived', {
    schema: RelayIceCandidateResponse.schema
  })

  const userDisconnected = socket.event('userDisconnected', {
    schema: LeaveRoomResponse.schema
  })

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

  return {
    joinRoom,
    leaveRoom,
    relayIceCandidate,
    relaySdpMetadata,
    sessionDescriptionReceived: metadataReceived,
    iceCandidateReceived,
    userConnected,
    userDisconnected,
    Gate: socket.Gate
  }
})
