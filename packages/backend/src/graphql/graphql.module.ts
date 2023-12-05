import { Module }                               from '@nestjs/common'
import { GraphQLModule as GraphqlConfigModule } from '@nestjs/graphql'
import { join }                                 from 'node:path'
import { MercuriusDriver }                      from '@nestjs/mercurius'
import { MercuriusDriverConfig }                from '@nestjs/mercurius'

@Module({
  imports: [
    GraphqlConfigModule.forRoot<MercuriusDriverConfig>({
      definitions: {
        outputAs: 'class',
        path: join(process.cwd(), 'packages/backend/src/graphql/gql.schema.ts')
      },
      driver: MercuriusDriver,
      typePaths: [
        join(process.cwd(), 'packages/backend/src/core/**/*.schema.gql')
      ]
    })
  ]
})
export class GraphQLModule {}
