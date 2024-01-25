import freeice      from 'freeice'
import { Nullable } from '@kurtex/std'
import { Stream }   from '@/entities/webrtc/model/core/stream'

export interface PeerConnectionProps {
  peerId: string
  localStream: Nullable<Stream>
}

export class PeerConnection extends RTCPeerConnection {
  private readonly _peerId: string
  private readonly localStream: MediaStream

  constructor(ctx: PeerConnectionProps) {
    /**
     * Closest STUN and TURN servers
     * for WebRTC peer2peer connection
     */
    const iceServers = freeice()

    super({ iceServers })

    this._peerId = ctx.peerId
    this.localStream = ctx.localStream!.stream

    this.addLocalTracks(this.localStream)
  }

  public onRemoteStream(callback: (stream: MediaStream) => void) {
    let trackCounter = 0

    this.addEventListener('track', (e) => {
      trackCounter++

      /**
       * If track is called 2 times,
       * then audio and video have arrived
       */
      const isVideoAndAudioReceived = trackCounter === 2

      if (isVideoAndAudioReceived) {
        const remoteStream = e.streams[0]

        callback(remoteStream)
      }
    })
  }

  public onIceCandidate(callback: (candidate: RTCIceCandidate) => void) {
    this.addEventListener('icecandidate', ({ candidate }) => {
      if (candidate) {
        callback(candidate)
      }
    })
  }

  private addLocalTracks(localStream: Nullable<MediaStream>) {
    if (!localStream) {
      // TODO: refactor
      throw new Error('error')
    }

    const tracks = localStream.getTracks()

    tracks.forEach((track) => {
      this.addTrack(track, localStream)
    })
  }

  public async createLocalMetadata() {
    const offer = await this.createOffer()

    await this.setLocalDescription(offer)

    return offer
  }

  public async setRemoteMetadata(metadata: RTCSessionDescriptionInit) {
    const sessionDescription = new RTCSessionDescription(metadata)

    await super.setRemoteDescription(sessionDescription)

    if (metadata.type === 'offer') {
      return this.createRemoteAnswer()
    }
  }

  public async addCandidate(candidate: RTCIceCandidateInit) {
    const iceCandidate = new RTCIceCandidate(candidate)

    await this.addIceCandidate(iceCandidate)
  }

  private async createRemoteAnswer() {
    const answer = await super.createAnswer()

    await this.setLocalDescription(answer)

    return answer
  }

  get peerId() {
    return this._peerId
  }
}

export const createPeerConnection = (
  ...args: ConstructorParameters<typeof PeerConnection>
) => new PeerConnection(...args)
