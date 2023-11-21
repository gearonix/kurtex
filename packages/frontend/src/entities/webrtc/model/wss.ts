import { forward }                 from 'effector'
import { sample }                  from 'effector'
import { scope }                   from '@grnx/effector-socket.io'
import { roomsListModel }          from '@/widgets/connected-rooms-list'
import * as schema                 from './lib/schema'
import { JoinRoom }                from './lib/interfaces'
import { RelayIceCandidateParams } from './lib/interfaces'
import { RelaySdpParams }          from './lib/interfaces'
import { $peerConnections }        from './peer-connections'
import { addRTCPeerConnectionFx }  from './effects'
import { atom }                    from '@/shared/factory/atom'
import { addSessionDescriptionFx } from './effects'

export const wss = atom(() => {
  const socket = scope(roomsListModel.socket)

  const joinRoom = socket.publisher<JoinRoom>('joinRoom')

  const leaveRoom = socket.publisher('leaveRoom')

  const relayIceCandidate =
    socket.publisher<RelayIceCandidateParams>('relayIceCandidate')
  const relaySdpMetadata = socket.publisher<RelaySdpParams>('relaySdp')

  const userConnected = socket.event('userConnected', {
    schema: schema.userConnected
  })

  const sessionDescriptionReceived = socket.event(
    'sessionDescriptionReceived',
    {
      schema: schema.sessionDescriptionReceived
    }
  )

  return {
    joinRoom,
    leaveRoom,
    relayIceCandidate,
    relaySdpMetadata,
    sessionDescriptionReceived,
    userConnected,
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