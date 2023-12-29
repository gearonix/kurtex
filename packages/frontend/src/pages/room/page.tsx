import { WithPageParams } from '@/shared/types'
import { VideoPlayer }    from '@/widgets/video-player'

/**
 * @temporary
 */
export interface RoomPageProps {
  createRoom?: boolean
}

export const RoomPage = ({ createRoom }: RoomPageProps) => {
  return (
    <div>
      <VideoPlayer createRoom={createRoom} />
      room page
    </div>
  )
}
