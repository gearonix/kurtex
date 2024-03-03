import { RelayIceCandidate } from '@kurtex/contracts'
import { attach } from 'effector/compat'
import { $peerConnections } from '..'

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
