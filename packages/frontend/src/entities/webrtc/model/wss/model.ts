// TODO: REFACTOR THIS SCOPING!!

import { createEvent }               from 'effector'
import { sample }                    from 'effector'
import { createStore }               from 'effector'
import { scope }                     from '@grnx/effector-socket.io'
import { roomsListModel }            from '@/widgets/connected-rooms-list/model'
import * as schema                   from './../lib/schema'
import { RelaySdpContext }           from './interfaces'
import { RelayIceCandidateContext }  from './interfaces'
import { PeerConnectionCreated }     from './interfaces'
import { JoinRoomPayload }           from './interfaces'
import { $peerConnections }          from '@/entities/webrtc/model/peer-connections'
import { $localStream }              from '@/entities/webrtc/model/local-stream'
import { getUserMediaFx }            from '@/entities/webrtc/model/media-streams'
import { moduleClosed }              from '@/entities/webrtc/model/entrypoint'
import { createRTCOfferFx }          from './effects'
import { CreateRTCOfferProps }       from './interfaces'
import { createRTCPeerConnectionFx } from './effects'
import { setupLocalTracksFx }        from './effects'

export const $roomId = createStore('custom-room-id-temporary')

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

/* samples */

sample({
  clock: peerConnectionAdded,
  source: $peerConnections,
  filter: (connections, { peerId }) => peerId in connections,
  fn: (_, ctx) => ctx,
  target: createRTCPeerConnectionFx
})

sample({
  clock: createRTCPeerConnectionFx.doneData,
  source: {
    localStream: $localStream,
    peerConnections: $peerConnections
  },
  fn: (src, payload) => ({ ...src, ...payload }) as CreateRTCOfferProps,
  target: setupLocalTracksFx
})

sample({
  clock: setupLocalTracksFx.doneData,
  source: {
    localStream: $localStream,
    peerConnections: $peerConnections
  },
  fn: (src, payload) => ({ ...src, ...payload }) as CreateRTCOfferProps,
  filter: (_, { shouldCreateOffer }) => shouldCreateOffer,
  target: createRTCOfferFx
})

sample({
  clock: getUserMediaFx.doneData,
  source: $roomId,
  fn: (roomId) => ({ roomId }),
  target: joinRoom
})

sample({
  clock: moduleClosed,
  target: leaveRoom
})
