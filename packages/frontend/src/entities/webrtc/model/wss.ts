import { createEvent }                  from 'effector'
import { sample }                       from 'effector'
import { scope }                        from '@grnx/effector-socket.io'
import { roomsListModel }               from '@/widgets/connected-rooms-list'
import * as schema                      from './lib/schema'
import { JoinRoomPayload }              from './lib/interfaces'
import { PeerConnectionCreatedPayload } from './lib/interfaces'
import { RelayIceCandidateParams }      from './lib/interfaces'
import { RelaySdpParams }               from './lib/interfaces'
import { $peerConnections }             from './peer-connections'
import { createRTCPeerConnectionFx }    from './effects'
import { atom }                         from '@/shared/factory/atom'

export const wss = atom(() => {
  const socket = scope(roomsListModel.socket)

  const joinRoom = socket.publisher<JoinRoomPayload>('joinRoom')

  const leaveRoom = socket.publisher('leaveRoom')

  const relayIceCandidate =
    socket.publisher<RelayIceCandidateParams>('relayIceCandidate')
  const relaySdp = socket.publisher<RelaySdpParams>('relaySdp')

  const peerConnectionAdded = socket.event('peerConnectionAdded', {
    schema: schema.addPeerConnection
  })

  return {
    joinRoom,
    leaveRoom,
    relayIceCandidate,
    relaySdp,
    peerConnectionAdded,
    Gate: socket.Gate
  }
})

/* events */

export const peerConnectionCreated = createEvent<PeerConnectionCreatedPayload>()

sample({
  clock: wss.peerConnectionAdded,
  source: $peerConnections,
  filter: (connections, { peerId }) => peerId in connections,
  fn: (_, ctx) => ctx,
  target: createRTCPeerConnectionFx
})
