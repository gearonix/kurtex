import { applyDecorators }       from '@nestjs/common'
import { rtcGatewayMethods } from '@kurtex/contracts'
import { ChannelsMethodsKeys }   from '@kurtex/contracts'
import { SubscribeMessage }      from '@nestjs/websockets'

export const WebsocketTopic = (method: ChannelsMethodsKeys) => {
  const originalMethod = rtcGatewayMethods[method]

  return applyDecorators(SubscribeMessage(originalMethod))
}
