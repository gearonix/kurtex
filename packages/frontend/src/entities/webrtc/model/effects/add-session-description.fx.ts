import { MetadataReceived } from '@kurtex/contracts'
import { attach } from 'effector/compat'
import { $peerConnections, wss } from '..'

export const addSessionDescriptionFx = attach({
  effect: async (peerConnections, { metadata, peerId }: MetadataReceived) => {
    const connection = peerConnections[peerId]

    const answer = await connection.setRemoteMetadata(
      metadata as RTCSessionDescriptionInit
    )

    if (!answer) return

    wss.relaySdpMetadata({
      metadata: answer,
      peerId
    })
  },
  source: $peerConnections
})
