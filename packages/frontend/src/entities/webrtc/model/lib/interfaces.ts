export interface PeerConnectionCreated {
  remoteStream: MediaStream
  peerId: string
}

export interface ProvideMediaRef {
  ref: HTMLVideoElement
  peerId: string
}
