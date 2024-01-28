import { attach }            from 'effector/compat'
import { $peerConnections }  from '../'
import { RelayIceCandidate } from '@kurtex/contracts'

export const addIceCandidateFx = attach({
  effect: async (
    peerConnections,
    { iceCandidate, peerId }: RelayIceCandidate
  ) => {
    const connection = peerConnections[peerId]

    await connection.addCandidate(iceCandidate)
  },
  source: $peerConnections
})
