import { attach }                     from 'effector/compat'
import { $peerConnections }           from '@/entities/webrtc/model/peer-connections'
import { wss }                        from '@/entities/webrtc/model/wss'
import {SessionDescriptionReceived} from "@/entities/webrtc/model/lib/interfaces";

export const addSessionDescriptionFx = attach({
  source: $peerConnections,
  effect: async (
    peerConnections,
    { peerId, metadata }: SessionDescriptionReceived
  ) => {
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
