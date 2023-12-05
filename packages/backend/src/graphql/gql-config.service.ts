import { Injectable }         from '@nestjs/common'
import { LoggerService }      from '@/logger'
import { GqlOptionsFactory }  from '@nestjs/graphql'
import { join }               from 'node:path'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { EnvService }         from '@/env'

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(
    private readonly env: EnvService,
    private readonly logger: LoggerService
  ) {}

  public createGqlOptions(): ApolloDriverConfig {
    this.logger.info(
      `GraphQLModule started at route
      ${this.env.server.url}/${this.env.graphql.prefix}`
    )

    return {
      definitions: {
        outputAs: 'class',
        path: this.resolveRootDir('graphql/gql.schema.ts')
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true
      },
      typePaths: [this.resolveRootDir('core/**/*.schema.gql')],
      useGlobalPrefix: true
    }
  }

  private resolveRootDir(path: string): string {
    return join(process.cwd(), this.env.server.srcDir, path)
  }
}
