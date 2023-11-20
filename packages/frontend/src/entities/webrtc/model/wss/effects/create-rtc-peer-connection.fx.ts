import { createEffect }             from 'effector/compat'
import { AddPeerConnectionContext } from '@/entities/webrtc/model/lib/schema'
import freeice                      from 'freeice'
import { addRtcClient }             from '@/entities/webrtc/model/rtc-clients'
import { peerConnectionCreated }    from '../model'
import { relayIceCandidate }        from '../model'

export const createRTCPeerConnectionFx = createEffect(async (
  ctx: AddPeerConnectionContext
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
