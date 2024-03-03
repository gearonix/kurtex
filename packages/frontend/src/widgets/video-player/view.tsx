'use client'

import { useGate, useUnit } from 'effector-react'
import { VideoDisplay } from '@/entities/video-display'
import {
  $rtcClients,
  provideMediaRef,
  rtcGate,
  usePermissions,
  wss
} from '@/entities/webrtc'

export interface VideoPlayerProps {
  createRoom?: boolean
}

export const VideoPlayer = ({ createRoom }: VideoPlayerProps) => {
  useGate(rtcGate, {
    createRoom
  })
  useGate(wss.Gate)

  usePermissions()

  const rtcClients = useUnit($rtcClients)
  const provideRef = useUnit(provideMediaRef)

  return (
    <div>
      Participants: {rtcClients.length}
      {rtcClients.map((clientId) => (
        <div key={clientId}>
          <VideoDisplay peerId={clientId} provideMediaRef={provideRef} />
        </div>
      ))}
    </div>
  )
}
