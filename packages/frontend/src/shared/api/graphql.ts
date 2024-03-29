import { createJsonQuery, Json } from '@farfetched/core'
import { zodContract } from '@farfetched/zod'
import { AnyObject } from '@kurtex/std'
import { DocumentNode } from 'graphql/language'
import { z } from 'zod'
import { $apiBaseUrl } from '@/shared/api/config'

export interface CreateGraphqlQueryOptions<Response> {
  name: string
  query: DocumentNode
  variables: (params: AnyObject | void) => Json
  contract?: Response
}

/**
 * @see https://farfetched.pages.dev/recipes/graphql_query
 */
export function createGraphqlQuery<Response extends z.Schema = z.ZodAny>({
  contract,
  name,
  query,
  variables
}: CreateGraphqlQueryOptions<Response>) {
  function getGqlString(doc: DocumentNode) {
    return doc.loc && doc.loc.source.body
  }

  function wrapIntoGqlOutput(contract: Response) {
    return z.object({
      data: z.object({
        [name]: contract
      })
    })
  }

  return createJsonQuery({
    name,
    request: {
      body: (params) => ({
        query: getGqlString(query),
        variables: variables(params)
      }),
      method: 'POST',
      url: $apiBaseUrl
    },
    response: {
      contract: zodContract(contract ? wrapIntoGqlOutput(contract) : z.any()),
      mapData: ({ result }) => {
        return result.data[name] as z.infer<Response>
      }
    }
  })
}
