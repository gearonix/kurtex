import { attach }               from 'effector/compat'
import { addRtcClient }         from '..'
import { addRemoteStream }      from '..'
import { $localStream }         from '..'
import { addPeerConnection }    from '..'
import { wss }                  from '..'
import { createPeerConnection } from '../core'
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
