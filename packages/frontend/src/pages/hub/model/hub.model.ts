import { atom }         from '@/shared/factory/atom'
import { createSocket } from '@/shared/lib/websocket/lib'

export const hubModel = atom(() => {
  const socket = createSocket({
    uri: 'http://localhost:6868/api/websocket/channels',
    methods: {
      channelsReceived: 'channels.channels-received'
    },
    dataPrefix: 'payload'
  })

  const $test = socket.restore<{ hello: '2' }>('channelsReceived', null)

  $test.watch($test, (val) => {
    console.log(val)
  })

  return {
    socket
  }
})
