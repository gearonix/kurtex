import { VideoPlayer }  from '@/widgets/video-player'
import { attachLogger } from 'effector-logger'

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
