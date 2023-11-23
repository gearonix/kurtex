'use client'

import { atom }              from '@/shared/factory/atom'
import { connect }           from '@grnx/effector-socket.io'
import { rtcGatewayMethods } from '@kurtex/contracts'

export const roomsListModel = atom(() => {
  const socket = connect({
    uri: 'http://localhost:6868/api/websocket/rtc',
    methods: rtcGatewayMethods,
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
