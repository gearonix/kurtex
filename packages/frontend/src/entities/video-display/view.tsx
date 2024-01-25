import { ProvideMediaRef } from '@/entities/webrtc/model/lib/interfaces'
import { AnyFunction }     from '@kurtex/std'

export interface VideoDisplayProps {
  provideMediaRef: AnyFunction<ProvideMediaRef>
  peerId: string
}

export const VideoDisplay = ({
  peerId,
  provideMediaRef
}: VideoDisplayProps) => {
  return (
    <video
      autoPlay
      playsInline
      ref={(ref) => provideMediaRef({ peerId, ref })}
    />
  )
}
