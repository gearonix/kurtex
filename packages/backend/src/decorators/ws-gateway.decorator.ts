import { applyDecorators }   from '@nestjs/common'
import { WebSocketGateway }  from '@nestjs/websockets'
import { WebsocketGateways } from '@/config'

export const WsGateway = (namespace?: WebsocketGateways) => {
  const namespacePrefix = `${process.env.SERVER_PREFIX}/websocket`

  return applyDecorators(
    WebSocketGateway({
      namespace: `${namespacePrefix}/${namespace}`,
      cors: true,
      transports: ['websocket', 'polling'],
      pingInterval: 3000,
      pintTimeout: 10000
    })
  )
}
