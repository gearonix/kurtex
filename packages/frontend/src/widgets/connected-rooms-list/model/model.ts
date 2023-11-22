'use client'

import { atom }                  from '@/shared/factory/atom'
import { connect }               from '@grnx/effector-socket.io'
import { channelGatewayMethods } from '@kurtex/contracts'

export const roomsListModel = atom(() => {
  const socket = connect({
    uri: 'http://localhost:6868/api/websocket/channels',
    methods: channelGatewayMethods,
    prefix: 'payload',
    logger: true
  })

  const $rooms = socket.restore<{ id: string }[]>('channelsReceived', {
    default: []
  })

  return {
    socket,
    $rooms
  }
})
