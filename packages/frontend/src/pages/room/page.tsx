import { WithPageParams } from '@/shared/types'
import { VideoPlayer }    from '@/widgets/video-player'

export interface RoomPageParams {
  id: string
}

export const RoomPage = ({ params }: WithPageParams<RoomPageParams>) => {
  return (
    <div>
      <VideoPlayer />
      room page
    </div>
  )
}
