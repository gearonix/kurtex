import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { GraphQLModule as GraphqlConfigModule } from '@nestjs/graphql'
import { GqlConfigService } from '@/graphql/gql-config.service'

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
