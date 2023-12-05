import { MiddlewareConsumer }                   from '@nestjs/common'
import { Module }                               from '@nestjs/common'
import { NestModule }                           from '@nestjs/common'
import { GraphQLModule as GraphqlConfigModule } from '@nestjs/graphql'
import { GqlConfigService }                     from '@/graphql/gql-config.service'
import { ApolloDriver }                         from '@nestjs/apollo'
import { ApolloDriverConfig }                   from '@nestjs/apollo'

@Module({
  imports: [
    GraphqlConfigModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService
    })
  ],
  providers: [GqlConfigService]
})
export class GraphQLModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configure(consumer: MiddlewareConsumer): void {
    /**
     * @temporary
     * Not works with fastify adapter
     */
    // consumer.apply(graphqlUploadExpress()).forRoutes('graphql')
  }
}
