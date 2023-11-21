import { combine }                   from 'effector'
import { createEvent }               from 'effector'
import { sample }                    from 'effector'
import { scope }                     from '@grnx/effector-socket.io'
import { roomsListModel }            from '@/widgets/connected-rooms-list'
import * as schema                   from './lib/schema'
import { JoinRoomPayload }           from './lib/interfaces'
import { PeerConnectionCreated }     from './lib/interfaces'
import { RelayIceCandidateContext }  from './lib/interfaces'
import { RelaySdpContext }           from './lib/interfaces'
import { $peerConnections }          from './peer-connections'
import { createRTCPeerConnectionFx } from './effects'
import { paramsModel }               from '@/shared/model/params'

export const $roomId = combine(
  paramsModel.$params,
  (params) => params?.id as string
)

export const socket = scope(roomsListModel.socket)

/* publishers */

export const joinRoom = socket.publisher<JoinRoomPayload>('joinRoom')

export const leaveRoom = socket.publisher('leaveRoom')

export const relayIceCandidate =
  socket.publisher<RelayIceCandidateContext>('relayIceCandidate')
export const relaySdp = socket.publisher<RelaySdpContext>('relaySdp')

/* websocket events */

export const peerConnectionAdded = socket.event('peerConnectionAdded', {
  schema: schema.addPeerConnection
})

/* events */

export const peerConnectionCreated = createEvent<PeerConnectionCreated>()

sample({
  clock: peerConnectionAdded,
  source: $peerConnections,
  filter: (connections, { peerId }) => peerId in connections,
  fn: (_, ctx) => ctx,
  target: createRTCPeerConnectionFx
})
