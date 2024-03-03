import { ModelDefinition } from '@nestjs/mongoose'
import { RtcConnection, RtcConnectionSchema } from './rtc-connection.entity'

export const ModuleEntities: ModelDefinition[] = [
  {
    name: RtcConnection.name,
    schema: RtcConnectionSchema
  }
]

export { RtcConnection }
