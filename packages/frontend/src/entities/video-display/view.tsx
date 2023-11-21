import { ProvideMediaRef } from '@/entities/webrtc/model/lib/interfaces'
import { AnyFunction }     from '@grnx-utils/types'

export interface VideoDisplayProps {
  provideMediaRef: AnyFunction<ProvideMediaRef>
  peerId: string
}

export const VideoDisplay = ({
  provideMediaRef,
  peerId
}: VideoDisplayProps) => {
  return (
    <video
      autoPlay
      playsInline
      ref={(ref) => provideMediaRef({ peerId, ref })}
    />
  )
}
