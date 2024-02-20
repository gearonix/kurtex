import { applyDecorators }   from '@nestjs/common'
import { WebSocketGateway }  from '@nestjs/websockets'
import { WebsocketGateways } from '@/config'

export const WsGateway = (namespace?: WebsocketGateways) => {
  const namespacePrefix = `${process.env.SERVER_PREFIX}/websocket`

  return applyDecorators(
    WebSocketGateway({
      cors: true,
      namespace: `${namespacePrefix}/${namespace}`,
      pingInterval: 3000,
      pintTimeout: 10000,
      transports: ['websocket', 'polling']
    })
  )
}
