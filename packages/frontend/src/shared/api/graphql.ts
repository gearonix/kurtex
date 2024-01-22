import { DocumentNode }    from 'graphql/language'
import { createJsonQuery } from '@farfetched/core'
import { Json }            from '@farfetched/core'
import { zodContract }     from '@farfetched/zod'
import { $apiBaseUrl }     from '@/shared/api/config'
import { AnyObject }       from '@grnx-utils/types'
import { z }               from 'zod'

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
      contract: zodContract(contract ?? z.any()),
      mapData: ({ result }) => {
        return result.data[name] as z.infer<Response>
      }
    }
  })
}
