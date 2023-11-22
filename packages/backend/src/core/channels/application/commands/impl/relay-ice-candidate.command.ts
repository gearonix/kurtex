export class RelayIceCandidateCommand {
  constructor(
    public readonly clientId: string,
    public readonly peerId: string,
    /**
     * @type {RTCIceCandidate}
     */
    public readonly iceCandidate: RTCIceCandidate
  ) {}
}
