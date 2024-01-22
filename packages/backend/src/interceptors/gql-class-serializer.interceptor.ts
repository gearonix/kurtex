import { CallHandler }                from '@nestjs/common'
import { SetMetadata }                from '@nestjs/common'
import { PlainLiteralObject }         from '@nestjs/common'
import { ClassSerializerInterceptor } from '@nestjs/common'
import { ExecutionContext }           from '@nestjs/common'
import { Injectable }                 from '@nestjs/common'
import { Reflector }                  from '@nestjs/core'
import { ClassTransformOptions }      from 'class-transformer'
import { Observable }                 from 'rxjs'
import { map }                        from 'rxjs/operators'

export const GQL_RETURN_TYPE = 'GQL_RETURN_TYPE'

export const GqlReturn = <T>(type: T) => SetMetadata('GQL_RETURN_TYPE', type)

@Injectable()
export class GqlClassSerializerInterceptor extends ClassSerializerInterceptor {
  constructor(
    protected readonly reflector: Reflector,
    defaultOptions?: ClassTransformOptions
  ) {
    super(reflector, defaultOptions)

    console.log('create')
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const contextType = context.getType().toString()

    if (contextType === 'graphql') {
      // GQL operation is stored here
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
          const serializeOptions = {
            ...this.defaultOptions,
            ...contextOptions,
            returnClass
          }

          this.serialize(res, serializeOptions)
        })
      )
    }

    return next.handle()

    /**
     * Removed because the default interceptor causes an endless loop
     */
    // return super.intercept(context, next)
  }
}
