import { ProvideMediaRef } from '@/entities/webrtc/model/lib/interfaces'
import { useUnit }         from 'effector-react'
import { $rtcClients }     from '@/entities/webrtc'
import { helloworldRef }   from '@/entities/webrtc'

export interface VideoDisplayProps {
  provideMediaRef: (ref: ProvideMediaRef) => void
  peerId: string
}

export const VideoDisplay = ({
  peerId,
  provideMediaRef
}: VideoDisplayProps) => {
  const rtcClients = useUnit($rtcClients)

  const provideRef = (ref: HTMLVideoElement) => {
    if (!ref) return

    provideMediaRef({ peerId, ref })
  }

  return <video autoPlay playsInline ref={provideRef} />
}
