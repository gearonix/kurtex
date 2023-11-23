import { ModelDefinition }     from '@nestjs/mongoose'

import { RtcConnection }       from './rtc-connection.entity'
import { RtcConnectionSchema } from './rtc-connection.entity'

export const ModuleEntities: ModelDefinition[] = [
  {
    name: RtcConnection.name,
    schema: RtcConnectionSchema
  }
]

export { RtcConnection }
