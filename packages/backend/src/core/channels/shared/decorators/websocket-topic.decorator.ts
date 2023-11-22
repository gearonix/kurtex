import { applyDecorators }       from '@nestjs/common'
import { channelGatewayMethods } from '@kurtex/contracts'
import { ChannelsMethodsKeys }   from '@kurtex/contracts'
import { SubscribeMessage }      from '@nestjs/websockets'

export const WebsocketTopic = (method: ChannelsMethodsKeys) => {
  const originalMethod = channelGatewayMethods[method]

  return applyDecorators(SubscribeMessage(originalMethod))
}
