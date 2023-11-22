export class RelaySdpMetadataCommand {
  constructor(
    public readonly clientId: string,
    public readonly peerId: string,
    /**
     * @type {ISessionDescriptionInit}
     */
    public readonly metadata: unknown
  ) {}
}
