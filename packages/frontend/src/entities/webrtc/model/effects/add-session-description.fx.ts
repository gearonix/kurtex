import { attach }           from 'effector/compat'
import { $peerConnections } from '@/entities/webrtc/model/peer-connections'
import { wss }              from '@/entities/webrtc/model/wss'
import { RelaySdpMetadata } from '@kurtex/contracts'

export const addSessionDescriptionFx = attach({
  source: $peerConnections,
  effect: async (peerConnections, { peerId, metadata }: RelaySdpMetadata) => {
    const connection = peerConnections[peerId]

    const answer = await connection.setRemoteMetadata(
      metadata as RTCSessionDescriptionInit
    )

    if (!answer) return

    wss.relaySdpMetadata({
      peerId,
      metadata: answer
    })
  }
})
