import { applyDecorators }   from '@nestjs/common'
import { WebSocketGateway }  from '@nestjs/websockets'
import { WebsocketGateways } from '@/config'

export const WsGateway = (namespace: WebsocketGateways) => {
  return applyDecorators(
    WebSocketGateway(Number(process.env.SERVER_WEBSOCKET_PORT), {
      namespace,
      cors: true,
      transports: ['websocket', 'polling']
    })
  )
}
