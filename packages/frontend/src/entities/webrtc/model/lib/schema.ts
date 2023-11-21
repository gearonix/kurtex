import { z } from 'zod'

export const userConnected = z.object({
  peerId: z.string(),
  shouldCreateOffer: z.boolean()
})

export const sessionDescriptionReceived = z.object({
  peerId: z.string(),
  metadata: z.object({})
})

export const iceCandidateReceived = z.object({
  peerId: z.string(),
  iceCandidate: z.object({})
})
