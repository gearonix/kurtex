import { attach }                     from 'effector/compat'
import { addRtcClient }               from '../rtc-clients'
import { wss }                        from '../wss'
import { UserConnectedSchema } from '@/entities/webrtc/model/lib/schema'
import { createPeerConnection }       from '../entities'
import { addRemoteStream }            from '@/entities/webrtc/model/media-streams'
import { $localStream }               from '@/entities/webrtc/model/local-stream'

export const addRTCPeerConnectionFx = attach({
  source: $localStream,
  effect: async (
    localStream,
    { peerId, shouldCreateOffer }: UserConnectedSchema
  ) => {
    const connection = createPeerConnection()

    connection.onIceCandidate((candidate) => {
      wss.relayIceCandidate({
        peerId,
        iceCandidate: candidate
      })
    })

    connection.onRemoteStream((stream) => {
      addRtcClient(peerId)
      addRemoteStream({ peerId, remoteStream: stream })
    })

    connection.addLocalTracks(localStream!)

    if (shouldCreateOffer) {
      const sessionDescription = await connection.createSessionDescription()

      wss.relaySdp({
        peerId,
        sessionDescription
      })
    }
  }
})
