import { z } from 'zod'

export const sessionDescriptionReceived = z.object({
  peerId: z.string(),
  metadata: z.object({})
})

export const iceCandidateReceived = z.object({
  peerId: z.string(),
  iceCandidate: z.object({})
})

export const userDisconnected = z.object({
  peerId: z.string()
})
