import { useUnit } from 'effector-react'
import { $rtcClients, helloworldRef } from '@/entities/webrtc'
import { ProvideMediaRef } from '@/entities/webrtc/model/lib/interfaces'

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
