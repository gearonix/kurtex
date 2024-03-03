import {
  CallHandler,
  ClassSerializerContextOptions,
  ClassSerializerInterceptor,
  ClassSerializerInterceptorOptions,
  ExecutionContext,
  Injectable,
  Logger,
  PlainLiteralObject,
  SetMetadata
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance
} from 'class-transformer'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export const GQL_RETURN_TYPE = 'GQL_RETURN_TYPE' as const

export const GqlReturn = <T>(type: T) => SetMetadata('GQL_RETURN_TYPE', type)

@Injectable()
export class GqlClassSerializerInterceptor extends ClassSerializerInterceptor {
  private readonly logger = new Logger(ClassSerializerInterceptor.name)

  constructor(
    protected readonly reflector: Reflector,
    defaultOptions?: ClassTransformOptions
  ) {
    super(reflector, defaultOptions)
  }

  override intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<unknown> {
    const contextType = context.getType().toString()

    if (contextType === 'graphql') {
      // gql operation is stored here
      const operationKind = context.getArgByIndex(3).operation

      if (operationKind.operation === 'subscription') {
        return next.handle()
      }

      const contextOptions = this.getContextOptions(context)

      const returnClass = Reflect.getMetadata(
        GQL_RETURN_TYPE,
        context.getHandler()
      )

      return next.handle().pipe(
        map((res: PlainLiteralObject | PlainLiteralObject[]) => {
          const serializeOptions: ClassSerializerInterceptorOptions & {
            returnClass: ClassConstructor<unknown>
          } = {
            ...this.defaultOptions,
            ...contextOptions,
            enableCircularCheck: true,
            returnClass
          }

          return this.serialize(res, serializeOptions)
        })
      )
    }

    return next.handle()

    /**
     * Removed because the default interceptor
     * causes an endless loop
     */
    // return super.intercept(context, next)
  }

  override serialize(
    response: PlainLiteralObject | PlainLiteralObject[],
    options: ClassSerializerContextOptions & {
      returnClass: ClassConstructor<unknown>
    }
  ): PlainLiteralObject | PlainLiteralObject[] {
    try {
      const target = options.returnClass
        ? plainToInstance(options.returnClass, response)
        : response

      return super.serialize(target as PlainLiteralObject, options)
    } catch (error) {
      this.logger.debug(response)
      this.logger.error(error)

      throw error
    }
  }
}
