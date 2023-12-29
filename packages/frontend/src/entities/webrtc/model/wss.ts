import { connect }           from '@grnx/effector-socket.io'
import { atom }              from '@/shared/factory/atom'
import { rtcGatewayMethods } from '@kurtex/contracts'
import { webrtc as rtc }     from '@kurtex/contracts'

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
