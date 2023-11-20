import { scope }                    from '@grnx/effector-socket.io'
import { roomsListModel }           from '@/widgets/connected-rooms-list/model'
import { createEvent }              from 'effector'
import { createStore }              from 'effector'
import { sample }                   from 'effector'
import { getUserMediaFx }           from '@/entities/webrtc/model/media-streams'
import { moduleClosed }             from '@/entities/webrtc/model/core'
import * as schema                  from './lib/schema'
import { $peerConnections }         from '@/entities/webrtc/model/peer-connections'
import { createEffect }             from 'effector/compat'
import freeice                      from 'freeice'
import { AddPeerConnectionContext } from './lib/schema'
import { addRtcClient }             from '@/entities/webrtc/model/rtc-clients'
import { $localStream }             from '@/entities/webrtc/model/local-stream'

// REFACTOR THIS SCOPING!!

export const $roomId = createStore('custom-room-id-temporary')

export const socket = scope(roomsListModel.socket)

export interface JoinRoomPayload {
  roomId: string
}

export const joinRoom = socket.publisher<JoinRoomPayload>('joinRoom')
export const leaveRoom = socket.publisher('leaveRoom')

export interface RelayIceCandidateContext {
  peerId: string
  iceCandidate: RTCIceCandidate
}

export const relayIceCandidate =
  socket.publisher<RelayIceCandidateContext>('relayIceCandidate')

export interface RelaySdpContext {
  peerId: string
  sessionDescription: RTCSessionDescriptionInit
}

export const relaySdp = socket.publisher<RelaySdpContext>('relaySdp')

export const peerConnectionAdded = socket.event('peerConnectionAdded', {
  schema: schema.addPeerConnection
})

export interface PeerConnectionCreated {
  remoteStream: MediaStream
  peerId: string
}

export const peerConnectionCreated = createEvent<PeerConnectionCreated>()

export const createRTCPeerConnectionFx = createEffect(async (
  ctx: AddPeerConnectionContext
) => {
  const peerConnection = new RTCPeerConnection({
    iceServers: freeice()
  })

  peerConnection.addEventListener('icecandidate', ({ candidate }) => {
    if (candidate) {
      relayIceCandidate({
        peerId: ctx.peerId,
        iceCandidate: candidate
      })
    }
  })

  let trackNumber = 0

  peerConnection.addEventListener('track', (e) => {
    trackNumber++
    if (trackNumber === 2) {
      const remoteStream = e.streams[0]

      addRtcClient(ctx.peerId)
      peerConnectionCreated({ peerId: ctx.peerId, remoteStream })
    }
  })

  return ctx
})

export const setupLocalTracksFx = createEffect(async (
  ctx: AddPeerConnectionContext & {
    localStream: MediaStream
    peerConnections: Record<string, RTCPeerConnection>
  }
) => {
  const rtcTracks = ctx.localStream.getTracks()

  rtcTracks.forEach((track) => {
    ctx.peerConnections[ctx.peerId].addTrack(track, ctx.localStream)
  })

  return ctx
})

export interface CreateRTCOfferProps extends AddPeerConnectionContext {
  localStream: MediaStream
  peerConnections: Record<string, RTCPeerConnection>
}

export const createRTCOfferFx = createEffect(async (
  ctx: CreateRTCOfferProps
) => {
  const connection = ctx.peerConnections[ctx.peerId]

  const offer = await connection.createOffer()

  await connection.setLocalDescription(offer)

  relaySdp({
    peerId: ctx.peerId,
    sessionDescription: offer
  })

  return ctx
})

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
