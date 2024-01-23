'use client'

import { useGate }         from 'effector-react'
import { useUnit }         from 'effector-react'
import { wss }             from '@/entities/webrtc'
import { rtcGate }         from '@/entities/webrtc'
import { $rtcClients }     from '@/entities/webrtc'
import { usePermissions }  from '@/entities/webrtc'
import { provideMediaRef } from '@/entities/webrtc'
import { VideoDisplay }    from '@/entities/video-display'
import { $roomId }         from '@/entities/webrtc/model/entrypoint'
import { $localStream }    from '@/entities/webrtc/model/local-stream'

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

  const roomId = useUnit($roomId)
  const localStream = useUnit($localStream)

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
