import { forward }                 from 'effector'
import { sample }                  from 'effector'
import { scope }                   from '@grnx/effector-socket.io'
import { roomsListModel }          from '@/widgets/connected-rooms-list'
import { $peerConnections }        from './peer-connections'
import { addIceCandidateFx }       from './effects'
import { addRTCPeerConnectionFx }  from './effects'
import { addSessionDescriptionFx } from './effects'
import { atom }                    from '@/shared/factory/atom'
import { webrtc as rtc }           from '@kurtex/contracts'

export const wss = atom(() => {
  const socket = scope(roomsListModel.socket)

  const joinRoom = socket.publisher<rtc.RelayIceCandidate>('joinRoom')

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
