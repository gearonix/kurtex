import { attach }           from 'effector/compat'
import { $peerConnections } from '..'
import { wss }              from '..'
import { MetadataReceived } from '@kurtex/contracts'

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
