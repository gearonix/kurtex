import { createEvent }    from 'effector'
import { createStore }    from 'effector'
import { PeerConnection } from 'src/entities/webrtc/model/core'

export const addPeerConnection = createEvent<PeerConnection>()

export const $peerConnections = createStore<Record<string, PeerConnection>>({})

$peerConnections.on(addPeerConnection, (state, connection) => ({
  ...state,
  [connection.peerId]: connection
}))
