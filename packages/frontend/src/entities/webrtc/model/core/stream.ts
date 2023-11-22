export class Stream {
  public readonly stream: MediaStream

  constructor(stream: MediaStream) {
    this.stream = stream
  }

  public close() {
    const tracks = this.stream.getTracks()

    tracks.forEach((track) => track.stop())
  }
}
