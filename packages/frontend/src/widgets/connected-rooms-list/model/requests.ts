import { createGraphqlQuery } from '@/shared/api'
import data                   from './../graphql/schema.gql'

export const getAllChannels = createGraphqlQuery({
  name: 'getAllChannels',
  query: data,
  variables: () => ({})
})
