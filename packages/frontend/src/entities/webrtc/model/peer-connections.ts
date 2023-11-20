import { createStore } from 'effector'

export const $peerConnections = createStore<Record<string, RTCPeerConnection>>(
  {}
)
