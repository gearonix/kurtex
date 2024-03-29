import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const ConnectedSocketId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const socket = context.switchToWs().getClient()

    return socket.id ?? null
  }
)
