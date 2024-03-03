import { attachLogger } from 'effector-logger'
import { VideoPlayer } from '@/widgets/video-player'

/**
 * @temporary
 */
export interface RoomPageProps {
  createRoom?: boolean
}

export const RoomPage = ({ createRoom }: RoomPageProps) => {
  // TODO: remove
  attachLogger()

  return (
    <div>
      <VideoPlayer createRoom={createRoom} />
      room page
    </div>
  )
}
