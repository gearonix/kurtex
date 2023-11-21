import { z } from 'zod'

export const userConnected = z.object({
  peerId: z.string(),
  shouldCreateOffer: z.boolean()
})

export type UserConnectedSchema = z.infer<typeof userConnected>
