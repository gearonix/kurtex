import { createGraphqlQuery } from '@/shared/api'
import query                  from './../graphql/schema.gql'
import { channels }           from '@kurtex/contracts'

const contract = channels.GetRtcChannelsRequest

export const getAllRpcChannels = createGraphqlQuery({
  contract: channels.GetRtcChannelsRequest.schema,
  name: contract.operation,
  query,
  variables: () => ({})
})
