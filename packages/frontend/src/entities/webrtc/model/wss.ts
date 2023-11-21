import { combine }                   from 'effector'
import { createEvent }               from 'effector'
import { sample }                    from 'effector'
import { scope }                     from '@grnx/effector-socket.io'
import { roomsListModel }            from '@/widgets/connected-rooms-list/model'
import * as schema                   from './lib/schema'
import { JoinRoomPayload }           from './lib/interfaces'
import { PeerConnectionCreated }     from './lib/interfaces'
import { RelayIceCandidateContext }  from './lib/interfaces'
import { RelaySdpContext }           from './lib/interfaces'
import { $peerConnections }          from '@/entities/webrtc/model/peer-connections'
import { moduleClosed }              from '@/entities/webrtc/model/entrypoint'
import { createRTCOfferFx }          from './effects'
import { getUserMediaFx }            from './effects'
import { createRTCPeerConnectionFx } from './effects'
import { setupLocalTracksFx }        from './effects'
import { paramsModel }               from '@/shared/model/params/model'

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
  target: setupLocalTracksFx
})

sample({
  clock: setupLocalTracksFx.doneData,
  filter: (ctx) => ctx.shouldCreateOffer,
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
