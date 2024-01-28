import { combine }               from 'effector'
import { createEffect }          from 'effector'
import { createEvent }           from 'effector'
import { restore }               from 'effector'
import { split }                 from 'effector'
import { createStore }           from 'effector'
import { merge }                 from 'effector'
import { sample }                from 'effector'
import { createGate }            from 'effector-react'
import { navigationModel }       from '@/shared/model/navigation'
import { isString }              from '@kurtex/std'
import { uniq }                  from '@kurtex/std'
import { Nullable }              from '@kurtex/std'
import { atom }                  from '@/shared/factory/atom'
import { connect }               from '@grnx/effector-socket.io'
import { MetadataReceived }      from '@kurtex/contracts'
import { RelayIceCandidate }     from '@kurtex/contracts'
import { UserConnected }         from '@kurtex/contracts'
import { rtcGatewayMethods }     from '@kurtex/contracts'
import { webrtc as rtc }         from '@kurtex/contracts'
import { LOCAL_MEDIA_STREAM }    from '@/entities/webrtc/model/lib/consts'
import { createPeerConnection }  from '@/entities/webrtc/model/core'
import { PeerConnection }        from '@/entities/webrtc/model/core'
import { removeKey }             from '@/shared/lib'
import { PeerConnectionCreated } from '@/entities/webrtc/model/lib/interfaces'
import { ProvideMediaRef }       from '@/entities/webrtc/model/lib/interfaces'
import { attach }                from 'effector/compat'
import { Stream }                from '@/entities/webrtc/model/core/stream'

export const getLocalMediaStreamFx = createEffect<void, Stream>(async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })

  return new Stream(localStream)
})

// WSS

export const wss = atom(() => {
  const socket = connect({
    logger: true,
    methods: rtcGatewayMethods,
    prefix: 'payload',
    uri: 'http://localhost:6868/api/websocket/rtc'
  })

  const joinRoom = socket.publisher<rtc.JoinRoom>('joinRoom')

  const leaveRoom = socket.publisher<rtc.LeaveRoom>('leaveRoom')

  const relayIceCandidate =
    socket.publisher<rtc.RelayIceCandidate>('relayIceCandidate')

  const relaySdpMetadata = socket.publisher<rtc.RelayIceCandidate>('relaySdp')

  const userConnected = socket.event('userConnected', {
    schema: rtc.ConnectUserResponse.schema
  })

  const metadataReceived = socket.event('metadataReceived', {
    schema: rtc.RelaySdpMetadataResponse.schema
  })

  const iceCandidateReceived = socket.event('iceCandidateReceived', {
    schema: rtc.RelayIceCandidateResponse.schema
  })

  const userDisconnected = socket.event('userDisconnected', {
    schema: rtc.LeaveRoomResponse.schema
  })

  return {
    Gate: socket.Gate,
    iceCandidateReceived,
    joinRoom,
    leaveRoom,
    relayIceCandidate,
    relaySdpMetadata,
    sessionDescriptionReceived: metadataReceived,
    userConnected,
    userDisconnected
  }
})

// STATUS

export const statusProvided = createEvent<PermissionState>()

export const statusDenied = createEvent()
export const statusGranted = createEvent()

export const $localStream = restore(getLocalMediaStreamFx.doneData, null)

split({
  cases: {
    denied: statusDenied,
    granted: statusGranted
  },
  match: {
    denied: (s) => s === 'denied',
    granted: (s) => s === 'granted'
  },
  source: statusProvided
})

// ENTRYPOINT

export const startConnection = createEvent()
export const closeConnection = createEvent()

export const rtcGate = createGate<{
  createRoom?: boolean
}>()

export const moduleStarted = merge([statusGranted, rtcGate.open])
export const moduleClosed = merge([statusDenied, rtcGate.close])

export const $roomId = createStore<Nullable<string>>(null)

sample({
  clock: rtcGate.open,
  fn: ({ params }) => {
    if (!isString(params.roomId)) {
      return null
    }

    return params.roomId
  },
  source: {
    params: navigationModel.$params
  },
  target: $roomId
})

sample({
  clock: moduleStarted,
  target: startConnection
})

sample({
  clock: moduleClosed,
  target: [closeConnection, wss.leaveRoom]
})

sample({
  clock: startConnection,
  target: getLocalMediaStreamFx
})

// RTC CLIENTS

export const $rtcClients = createStore<string[]>([])

export const addRtcClient = createEvent<string>()

export const removeStream = createEvent<{
  peerId: string
}>()

$rtcClients.on(addRtcClient, (s, v) => uniq([...s, v]))

$rtcClients.on([wss.userDisconnected, removeStream], (clients, { peerId }) => {
  return clients.filter((c) => c !== peerId)
})

// sample({
//   clock: getLocalMediaStreamFx.doneData,
//   fn: (roomId) => ({ roomId }),
//   source: $roomId,
//   target: wss.joinRoom
// })

sample({
  clock: getLocalMediaStreamFx.doneData,
  fn: () => LOCAL_MEDIA_STREAM,
  target: addRtcClient
})

export const addRTCPeerConnectionFx = attach({
  effect: async (localStream, { peerId, shouldCreateOffer }: UserConnected) => {
    const connection = createPeerConnection({
      localStream,
      peerId
    })

    addPeerConnection(connection)

    connection.onIceCandidate((candidate) => {
      wss.relayIceCandidate({
        iceCandidate: candidate,
        peerId
      })
    })

    connection.onRemoteStream((stream) => {
      addRtcClient(peerId)
      addRemoteStream({ peerId, remoteStream: stream })
    })

    if (shouldCreateOffer) {
      const metadata = await connection.createLocalMetadata()

      wss.relaySdpMetadata({
        iceCandidate: metadata,
        peerId
      })
    }
  },
  source: $localStream
})

sample({
  clock: statusDenied,
  fn: () => ({
    peerId: LOCAL_MEDIA_STREAM
  }),
  target: removeStream
})

// PEER CONNECTINOS

export const addPeerConnection = createEvent<PeerConnection>()

export const $peerConnections = createStore<Record<string, PeerConnection>>({})

export const addIceCandidateFx = attach({
  effect: async (
    peerConnections,
    { iceCandidate, peerId }: RelayIceCandidate
  ) => {
    const connection = peerConnections[peerId]

    await connection.addCandidate(iceCandidate)
  },
  source: $peerConnections
})

sample({
  clock: wss.iceCandidateReceived,
  target: addIceCandidateFx
})

export const addSessionDescriptionFx = attach({
  effect: async (peerConnections, { metadata, peerId }: MetadataReceived) => {
    const connection = peerConnections[peerId]

    const answer = await connection.setRemoteMetadata(
      metadata as RTCSessionDescriptionInit
    )

    if (!answer) return

    wss.relaySdpMetadata({
      metadata: answer,
      peerId
    })
  },
  source: $peerConnections
})

sample({
  clock: wss.sessionDescriptionReceived,
  target: addSessionDescriptionFx
})

$peerConnections.on(addPeerConnection, (state, connection) => ({
  ...state,
  [connection.peerId]: connection
}))

$peerConnections.on(wss.userDisconnected, (state, { peerId }) => {
  const [clone, removedPeer] = removeKey(state, peerId)

  removedPeer.close()

  return clone
})

// TODOX
// sample({
//   clock: wss.userConnected,
//   filter: (connections, { peerId }) => !(peerId in connections),
//   fn: (_, ctx) => ctx,
//   source: $peerConnections,
//   target: addRTCPeerConnectionFx
// })

export const addRemoteStream = createEvent<PeerConnectionCreated>()
export const provideMediaRef = createEvent<ProvideMediaRef>()

// CLIENT MEDIA STREAMS

export const $clientMediaStreams = createStore<
  Record<string, Nullable<HTMLVideoElement>>
>({
  [LOCAL_MEDIA_STREAM]: null
})

$clientMediaStreams.on(statusDenied, (streams) => ({
  ...streams,
  [LOCAL_MEDIA_STREAM]: null
}))

$clientMediaStreams.on(addRemoteStream, (streams, { peerId, remoteStream }) => {
  if (streams[peerId]) {
    streams[peerId]!.srcObject = remoteStream
  }

  return streams
})

$clientMediaStreams.on(provideMediaRef, (streams, { peerId, ref }) => ({
  ...streams,
  [peerId]: ref
}))

$clientMediaStreams.on(wss.userDisconnected, (streams, { peerId }) => {
  const [clone] = removeKey(streams, peerId)

  return clone
})

$clientMediaStreams.on($localStream, (streams, localStream) => {
  const localRef = streams[LOCAL_MEDIA_STREAM]

  if (!localRef) {
    throw new Error('No local ref found.')
  }

  localRef.srcObject = localStream!.stream
  localRef.volume = 0
})

const $logger = combine($rtcClients, $peerConnections, $clientMediaStreams, (
  rtcClients,
  peerConnections,
  clientMediaStreams
) => ({
  clientMediaStreams,
  peerConnections,
  rtcClients
}))

$logger.watch(console.log)
