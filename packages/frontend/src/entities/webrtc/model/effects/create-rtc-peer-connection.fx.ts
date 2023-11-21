import { createEffect }             from 'effector/compat'
import freeice                      from 'freeice'
import { addRtcClient }             from '@/entities/webrtc/model/rtc-clients'
import { peerConnectionCreated }    from '../wss'
import { wss }                      from '../wss'
import { sample }                   from 'effector'
import { setupLocalTracksFx }       from '@/entities/webrtc/model/effects/setup-local-tracks.fx'
import { AddPeerConnectionSchema } from '@/entities/webrtc/model/lib/schema'

export const createRTCPeerConnectionFx = createEffect(async (
  ctx: AddPeerConnectionSchema
) => {
  const peerConnection = new RTCPeerConnection({
    iceServers: freeice()
  })

  peerConnection.addEventListener('icecandidate', ({ candidate }) => {
    if (candidate) {
      wss.relayIceCandidate({
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
