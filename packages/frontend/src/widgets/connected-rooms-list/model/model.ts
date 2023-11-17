'use client'

import { atom }                     from '@/shared/factory/atom'
import { connect }                  from '@grnx/effector-socket.io'
import { roomsSchema }              from '@/widgets/connected-rooms-list/model/schema'
import { channelsWebsocketMethods } from '@/widgets/connected-rooms-list/model/ws/methods'

export const roomsListModel = atom(() => {
  const socket = connect({
    uri: 'http://localhost:6868/api/websocket/channels',
    methods: channelsWebsocketMethods,
    prefix: 'payload',
    logger: true
  })

  const $rooms = socket.restore<{ id: string }[]>('channelsReceived', {
    default: [],
    schema: roomsSchema
  })

  return {
    socket,
    $rooms
  }
})
