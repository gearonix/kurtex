import { attach }               from 'effector/compat'
import { addRtcClient }         from '../rtc-clients'
import { wss }                  from '../wss'
import { createPeerConnection } from '../core'
import { addRemoteStream }      from '@/entities/webrtc/model/media-streams'
import { $localStream }         from '@/entities/webrtc/model/local-stream'
import { addPeerConnection }    from '@/entities/webrtc/model/peer-connections'
import { UserConnected }        from '@kurtex/contracts'

export const addRTCPeerConnectionFx = attach({
  effect: async (localStream, { peerId, shouldCreateOffer }: UserConnected) => {
    const connection = createPeerConnection({
      localStream,
      peerId
    })

    addPeerConnection(connection)

    connection.onIceCandidate((candidate) => {
      wss.relayIceCandidate({
        iceCandidate: candidate,
        peerId
      })
    })

    connection.onRemoteStream((stream) => {
      addRtcClient(peerId)
      addRemoteStream({ peerId, remoteStream: stream })
    })

    if (shouldCreateOffer) {
      const metadata = await connection.createLocalMetadata()

      wss.relaySdpMetadata({
        iceCandidate: metadata,
        peerId
      })
    }
  },
  source: $localStream
})
