import { NextPage }  from 'next'
import { io }        from 'socket.io-client'
import { useEffect } from 'react'
import { Test }      from '@/pages/hub/test'

export const HubPage: NextPage = () => {
  return <Test />
}
