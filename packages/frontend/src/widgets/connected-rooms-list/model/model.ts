'use client'

import { atom }              from '@/shared/factory/atom'
import { connect }           from '@grnx/effector-socket.io'
import { rtcGatewayMethods } from '@kurtex/contracts'
import { createStore }       from 'effector'

export const roomsListModel = atom(() => {
  const socket = connect({
    logger: true,
    methods: rtcGatewayMethods,
    prefix: 'payload',
    uri: 'http://localhost:6868/api/websocket/rtc'
  })

  const $rooms = createStore<{ id: string }[]>([])

  return {
    $rooms,
    socket
  }
})
