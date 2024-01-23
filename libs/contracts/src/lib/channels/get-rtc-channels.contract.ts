import { z }               from 'zod'
import { GraphqlContract } from '../../shared'
import { InferElement }    from '../../shared/types'

export class GetRtcChannelsRequest implements GraphqlContract {
  public static readonly operation = 'getAllRpcChannels'

  public static readonly schema = z.array(
    z.object({
      id: z.string(),
      participants: z.array(
        z.object({
          accountId: z.string(),
          id: z.string(),
          peerConnectionId: z.string()
        })
      )
    })
  )
}

export class GetRtcChannelsResponse implements GraphqlContract {
  public static readonly operation = 'getAllRpcChannels'

  // TODO: remove this, implement pagination
  public static readonly schema = z.any()
}

export type ReceivedRtcChannel = InferElement<
  z.infer<typeof GetRtcChannelsRequest.schema>
>
