export const ChannelGatewayMethods = {
  channelsReceived: 'channels.channels-received',
  joinRoom: 'channels.join-webrtc-room',
  leaveRoom: 'channels.leave-webrtc-room',
  relayIceCandidate: 'channels.rela-ice-candidate',
  relaySdp: 'channels.relay-sdp',
  userConnected: 'channels.user-connected',
  sessionDescriptionReceived: 'channels.session-description-received',
  iceCandidateReceived: 'channels.ice-candidate-received',
  userDisconnected: 'channels.user-disconnected'
} as const

export type ChannelsMethodsKeys = typeof ChannelGatewayMethods
