import { attach }                     from 'effector/compat'
import { $peerConnections }           from '@/entities/webrtc/model/peer-connections'
import { IceCandidateReceived }       from '@/entities/webrtc/model/lib/interfaces'

export const addIceCandidateFx = attach({
  source: $peerConnections,
  effect: async (
    peerConnections,
    { peerId, iceCandidate }: IceCandidateReceived
  ) => {
    const connection = peerConnections[peerId]

    await connection.addCandidate(iceCandidate)
  }
})
