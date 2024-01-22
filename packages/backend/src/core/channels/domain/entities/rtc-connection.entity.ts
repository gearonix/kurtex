import { Prop }          from '@nestjs/mongoose'
import { SchemaFactory } from '@nestjs/mongoose'
import { Schema }        from '@nestjs/mongoose'
import mongoose          from 'mongoose'

@Schema({ collection: 'rtc_connections' })
export class RtcConnection {
  @Prop({
    type: [
      {
        accountId: { required: false, type: mongoose.Schema.Types.ObjectId },
        peerConnectionId: {
          required: true,
          type: mongoose.Schema.Types.ObjectId
        }
      }
    ]
  })
  participants: { accountId?: string; peerConnectionId: string }[]
}

export const RtcConnectionSchema = SchemaFactory.createForClass(RtcConnection)
