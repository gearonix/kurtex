import { z }                          from 'zod'
import { iceCandidateReceived }       from '@/entities/webrtc/model/lib/schema'
import { sessionDescriptionReceived } from '@/entities/webrtc/model/lib/schema'

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

export interface RelayIceCandidateParams {
  peerId: string
  iceCandidate: RTCIceCandidate
}

export interface JoinRoom {
  roomId: string
}

export type SessionDescriptionReceived = z.infer<
  typeof sessionDescriptionReceived
>

export type IceCandidateReceived = z.infer<typeof iceCandidateReceived>
