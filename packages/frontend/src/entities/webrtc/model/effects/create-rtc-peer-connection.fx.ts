import { createEffect }          from 'effector/compat'
import freeice                   from 'freeice'
import { addRtcClient }          from '@/entities/webrtc/model/rtc-clients'
import { peerConnectionCreated } from '../wss'
import { relayIceCandidate }     from '../wss'
import { CreateRTCOfferProps }   from '@/entities/webrtc/model/lib/interfaces'
import { sample }                from 'effector'
import { setupLocalTracksFx }    from '@/entities/webrtc/model/effects/setup-local-tracks.fx'

export const createRTCPeerConnectionFx = createEffect(async (
  ctx: CreateRTCOfferProps
) => {
  const peerConnection = new RTCPeerConnection({
    iceServers: freeice()
  })

  peerConnection.addEventListener('icecandidate', ({ candidate }) => {
    if (candidate) {
      relayIceCandidate({
        peerId: ctx.peerId,
        iceCandidate: candidate
      })
    }
  })

  let trackNumber = 0

  peerConnection.addEventListener('track', (e) => {
    trackNumber++
    if (trackNumber === 2) {
      const remoteStream = e.streams[0]

      addRtcClient(ctx.peerId)
      peerConnectionCreated({ peerId: ctx.peerId, remoteStream })
    }
  })

  return ctx
})

sample({
  clock: createRTCPeerConnectionFx.doneData,
  target: setupLocalTracksFx
})
