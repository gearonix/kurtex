import { attach }            from 'effector/compat'
import { $peerConnections }  from '@/entities/webrtc/model/peer-connections'
import { RelayIceCandidate } from '@kurtex/contracts'

export const addIceCandidateFx = attach({
  source: $peerConnections,
  effect: async (
    peerConnections,
    { peerId, iceCandidate }: RelayIceCandidate
  ) => {
    const connection = peerConnections[peerId]

    await connection.addCandidate(iceCandidate)
  }
})
