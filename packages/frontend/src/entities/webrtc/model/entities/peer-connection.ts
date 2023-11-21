import freeice from 'freeice'

export class PeerConnection extends RTCPeerConnection {
  constructor() {
    /**
     * Closest STUN and TURN servers
     * for WebRTC peer2peer connection
     */
    const iceServers = freeice()

    super({ iceServers })
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

  public addLocalTracks(localStream: MediaStream) {
    const tracks = localStream.getTracks()

    tracks.forEach((track) => {
      this.addTrack(track, localStream)
    })
  }

  public async createSessionDescription() {
    const offer = await this.createOffer()

    await this.setLocalDescription(offer)

    return offer
  }
}

export const createPeerConnection = () => new PeerConnection()
