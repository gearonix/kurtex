import { Prop }          from '@nestjs/mongoose'
import { SchemaFactory } from '@nestjs/mongoose'
import { Schema }        from '@nestjs/mongoose'
import mongoose          from 'mongoose'

@Schema()
export class RtcConnection {
  @Prop({
    type: [
      {
        accountId: { type: mongoose.Schema.Types.ObjectId, required: false },
        peerConnectionId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        }
      }
    ]
  })
  participants: {
    accountId?: string
    peerConnectionId: string
  }
}

export const RtcConnectionSchema =
  SchemaFactory.createForClass(RtcConnection)
