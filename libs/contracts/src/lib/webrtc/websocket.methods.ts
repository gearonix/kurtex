export const rtcGatewayMethods = {
  channelsReceived: 'channels.channels-received',
  iceCandidateReceived: 'channels.ice-candidate-received',
  joinRoom: 'channels.join-webrtc-room',
  leaveRoom: 'channels.leave-webrtc-room',
  metadataReceived: 'channels.metadata-received',
  relayIceCandidate: 'channels.rela-ice-candidate',
  relaySdp: 'channels.relay-sdp',
  userConnected: 'channels.user-connected',
  userDisconnected: 'channels.user-disconnected'
} as const

export type ChannelGatewayMethods = typeof rtcGatewayMethods

export type ChannelsMethodsKeys = keyof typeof rtcGatewayMethods
