import { UserConnected } from '@kurtex/contracts'
import { attach } from 'effector/compat'
import {
  $localStream,
  addPeerConnection,
  addRemoteStream,
  addRtcClient,
  wss
} from '..'
import { createPeerConnection } from '../core'

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
