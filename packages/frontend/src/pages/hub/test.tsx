'use client'

import { useEffect } from 'react'
import { io }        from 'socket.io-client'
import { useGate }   from 'effector-react'
import { hubModel }  from '@/pages/hub/model'

export const Test = () => {
  useGate(hubModel.socket.gate)

  return null
}
