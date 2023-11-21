import { z } from 'zod'

export const addPeerConnection = z.object({
  peerId: z.string(),
  shouldCreateOffer: z.boolean()
})

export type AddPeerConnectionSchema = z.infer<typeof addPeerConnection>
