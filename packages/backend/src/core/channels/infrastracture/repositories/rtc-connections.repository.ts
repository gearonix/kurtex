import { Model }         from 'mongoose'
import { RtcConnection } from '@core/channels/domain/entities'
import { InjectModel }   from '@nestjs/mongoose'

export class RtcConnectionsRepository {
  constructor(
    @InjectModel(RtcConnection.name)
    private readonly rtcModel: Model<RtcConnection>
  ) {}

  public getLatestRtcConnections() {
    return this.rtcModel.find()
  }
}
