import { createGraphqlQuery } from '@/shared/api'
import query                  from './../graphql/schema.gql'
import { channels }           from '@kurtex/contracts'

export const getAllRpcChannels = createGraphqlQuery({
  contract: channels.GetRtcChannelsRequest.schema,
  name: channels.GetRtcChannelsRequest.operation,
  query,
  variables: () => ({})
})
