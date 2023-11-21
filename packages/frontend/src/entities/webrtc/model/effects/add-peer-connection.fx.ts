import { attach }               from 'effector/compat'
import { addRtcClient }         from '../rtc-clients'
import { wss }                  from '../wss'
import { createPeerConnection } from '../core'
import { addRemoteStream }      from '@/entities/webrtc/model/media-streams'
import { $localStream }         from '@/entities/webrtc/model/local-stream'
import { addPeerConnection }    from '@/entities/webrtc/model/peer-connections'
import {UserConnected} from "@/entities/webrtc/model/lib/interfaces";

export const addRTCPeerConnectionFx = attach({
  source: $localStream,
  effect: async (localStream, { peerId, shouldCreateOffer }: UserConnected) => {
    const connection = createPeerConnection({ peerId, localStream })

    addPeerConnection(connection)

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

    if (shouldCreateOffer) {
      const metadata = await connection.createLocalMetadata()

      wss.relaySdpMetadata({
        peerId,
        metadata
      })
    }
  }
})
