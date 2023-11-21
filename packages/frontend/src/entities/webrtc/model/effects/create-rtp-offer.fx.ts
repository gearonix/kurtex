import { attach }                   from 'effector/compat'
import { relaySdp }                 from '../wss'
import { $localStream }             from '@/entities/webrtc/model/local-stream'
import { $peerConnections }         from '@/entities/webrtc/model/peer-connections'
import { AddPeerConnectionContext } from '@/entities/webrtc/model/lib/schema'

export const createRTCOfferFx = attach({
  source: {
    localStream: $localStream,
    peerConnections: $peerConnections
  },
  effect: async ({ peerConnections }, ctx: AddPeerConnectionContext) => {
    const connection = peerConnections[ctx.peerId]

    const offer = await connection.createOffer()

    await connection.setLocalDescription(offer)

    relaySdp({
      peerId: ctx.peerId,
      sessionDescription: offer
    })

    return ctx
  }
})
