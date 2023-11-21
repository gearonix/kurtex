import { attach }                   from 'effector'
import { sample }                   from 'effector'
import { $localStream }             from '../local-stream'
import { $peerConnections }         from '../peer-connections'
import { AddPeerConnectionSchema } from '../lib/schema'
import { createRTCOfferFx }         from './create-rtp-offer.fx'

export const setupLocalTracksFx = attach({
  source: {
    localStream: $localStream,
    peerConnections: $peerConnections
  },
  effect: async (
    { localStream, peerConnections },
    ctx: AddPeerConnectionSchema
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

sample({
  clock: setupLocalTracksFx.doneData,
  filter: (ctx) => ctx.shouldCreateOffer,
  target: createRTCOfferFx
})
