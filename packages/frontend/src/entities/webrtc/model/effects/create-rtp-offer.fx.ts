import { attach }                   from 'effector/compat'
import { $localStream }             from '@/entities/webrtc/model/local-stream'
import { $peerConnections }         from '@/entities/webrtc/model/peer-connections'
import { AddPeerConnectionSchema } from '@/entities/webrtc/model/lib/schema'
import {wss} from "@/entities/webrtc/model/wss";

export const createRTCOfferFx = attach({
  source: {
    localStream: $localStream,
    peerConnections: $peerConnections
  },
  effect: async ({ peerConnections }, ctx: AddPeerConnectionSchema) => {
    const connection = peerConnections[ctx.peerId]

    const offer = await connection.createOffer()

    await connection.setLocalDescription(offer)

    wss.relaySdp({
      peerId: ctx.peerId,
      sessionDescription: offer
    })

    return ctx
  }
})
