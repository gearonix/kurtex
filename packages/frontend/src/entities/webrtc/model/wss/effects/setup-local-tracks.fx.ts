import { createEffect }        from 'effector/compat'
import { CreateRTCOfferProps } from '../interfaces'

export const setupLocalTracksFx = createEffect(async (
  ctx: CreateRTCOfferProps
) => {
  const rtcTracks = ctx.localStream.getTracks()

  rtcTracks.forEach((track) => {
    ctx.peerConnections[ctx.peerId].addTrack(track, ctx.localStream)
  })

  return ctx
})
