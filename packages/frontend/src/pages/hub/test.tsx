'use client'

import { useEffect } from 'react'
import { io }        from 'socket.io-client'

export const Test = () => {
  useEffect(() => {
    const socket = io('http://localhost:6868/api/websocket/channels')

    socket.on('channels.channels-received', (data) => {
      console.log(data)

    })

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('connect_error', (err) => {
      console.log(err)
    })
  })

  return null
}
