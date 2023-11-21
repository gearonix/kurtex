import { attach }                   from 'effector'
import { $localStream }             from '@/entities/webrtc/model/local-stream'
import { $peerConnections }         from '@/entities/webrtc/model/peer-connections'
import { AddPeerConnectionContext } from '@/entities/webrtc/model/lib/schema'

export const setupLocalTracksFx = attach({
  source: {
    localStream: $localStream,
    peerConnections: $peerConnections
  },
  effect: async (
    { localStream, peerConnections },
    ctx: AddPeerConnectionContext
  ) => {
    if (!localStream) {
      // TODO: refactor
      throw new Error('error')
    }

    const rtcTracks = localStream.getTracks()

    rtcTracks.forEach((track) => {
      peerConnections[ctx.peerId].addTrack(track, localStream)
    })

    return ctx
  }
})
