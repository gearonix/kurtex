import { createEffect }        from 'effector/compat'
import { CreateRTCOfferProps } from './../interfaces'
import { relaySdp }            from '../model'

export const createRTCOfferFx = createEffect(async (
  ctx: CreateRTCOfferProps
) => {
  const connection = ctx.peerConnections[ctx.peerId]

  const offer = await connection.createOffer()

  await connection.setLocalDescription(offer)

  relaySdp({
    peerId: ctx.peerId,
    sessionDescription: offer
  })

  return ctx
})
