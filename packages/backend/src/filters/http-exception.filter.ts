import { ArgumentsHost }   from '@nestjs/common'
import { Catch }           from '@nestjs/common'
import { ExceptionFilter } from '@nestjs/common'
import { HttpException }   from '@nestjs/common'
import { FastifyReply }    from 'fastify'
import { FastifyRequest }  from 'fastify'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const reply = ctx.getResponse<FastifyReply>()
    const request = ctx.getRequest<FastifyRequest>()
    const status = exception.getStatus()

    reply.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message
    })
  }
}
