import { createEvent }            from 'effector'
import { sample }                 from 'effector'
import { createStore }            from 'effector'
import { PeerConnection }         from 'src/entities/webrtc/model/core'
import { wss }                    from '@/entities/webrtc/model/wss'
import { removeKey }              from 'src/shared/lib/shared'
import { addRTCPeerConnectionFx } from '@/entities/webrtc/model/effects'

export const addPeerConnection = createEvent<PeerConnection>()

export const $peerConnections = createStore<Record<string, PeerConnection>>({})

$peerConnections.on(addPeerConnection, (state, connection) => ({
  ...state,
  [connection.peerId]: connection
}))

$peerConnections.on(wss.userDisconnected, (state, { peerId }) => {
  const [clone, removedPeer] = removeKey(state, peerId)

  removedPeer.close()

  return clone
})

sample({
  clock: wss.userConnected,
  filter: (connections, { peerId }) => !(peerId in connections),
  fn: (_, ctx) => ctx,
  source: $peerConnections,
  target: addRTCPeerConnectionFx
})
