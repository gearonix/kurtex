import { WithPageParams } from '@/shared/lib/interfaces'
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
