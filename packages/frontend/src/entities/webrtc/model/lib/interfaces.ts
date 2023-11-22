export interface PeerConnectionCreated {
  remoteStream: MediaStream
  peerId: string
}

export interface ProvideMediaRef {
  ref: HTMLVideoElement
  peerId: string
}

export interface RelaySdpParams {
  peerId: string
  metadata: RTCSessionDescriptionInit
}

export interface JoinRoom {
  roomId: string
}
