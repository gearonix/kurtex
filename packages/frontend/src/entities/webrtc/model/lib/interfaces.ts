export interface PeerConnectionCreatedPayload {
  remoteStream: MediaStream
  peerId: string
}

export interface RelaySdpParams {
  peerId: string
  sessionDescription: RTCSessionDescriptionInit
}

export interface RelayIceCandidateParams {
  peerId: string
  iceCandidate: RTCIceCandidate
}

export interface JoinRoomPayload {
  roomId: string
}
