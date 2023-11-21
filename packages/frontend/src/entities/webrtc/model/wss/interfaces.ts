export interface PeerConnectionCreated {
  remoteStream: MediaStream
  peerId: string
}
export interface RelaySdpContext {
  peerId: string
  sessionDescription: RTCSessionDescriptionInit
}
export interface RelayIceCandidateContext {
  peerId: string
  iceCandidate: RTCIceCandidate
}

export interface JoinRoomPayload {
  roomId: string
}
