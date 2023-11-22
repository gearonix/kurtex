import { z }                   from 'zod'
import { createZodDto }        from 'nestjs-zod'
import { Contract }            from '@/shared'
import { ChannelsMethodsKeys } from '@/lib/webrtc/websocket.methods'
import { LeaveRoomRequest }    from '@/lib/webrtc/leave-room.contract'
import { LeaveRoomResponse }   from '@/lib/webrtc/leave-room.contract'

export abstract class RelayIceCandidateRequest implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'relayIceCandidate'

  public static readonly schema = z.object({
    peerId: z.string(),
    iceCandidate: z.object({})
  })

  public static get dto() {
    return class Dto extends createZodDto(this.schema) {}
  }
}

export abstract class RelayIceCandidateResponse implements Contract {
  public static readonly topic: ChannelsMethodsKeys = 'iceCandidateReceived'

  public static readonly schema = z.object({
    peerId: z.string(),
    iceCandidate: z.object({})
  })
}

export type RelayIceCandidateRequestDto = InstanceType<
  typeof RelayIceCandidateRequest.dto
>

export type RelayIceCandidateResponseSchema = z.infer<
  typeof RelayIceCandidateResponse.schema
>
