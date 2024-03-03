import { RtcConnection } from '@core/channels/domain/entities'
import {
  NotFoundAfterTransactionException,
  TransactionFailedException
} from '@core/channels/shared/exceptions'
import { Nullable } from '@kurtex/std'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { DatabaseUtilityService } from '@/database'

@Injectable()
export class RtcConnectionsRepository {
  constructor(
    @InjectModel(RtcConnection.name)
    private readonly rtcConnections: Model<RtcConnection>,
    private readonly utilityService: DatabaseUtilityService
  ) {}

  public async getLatestRtcConnections() {
    /**
     * @temporary
     */
    return this.rtcConnections.find()
  }

  public async createConnectionOrAddPeerId(
    peerConnectionId: string,
    rtcRoomId: Nullable<string>
  ) {
    // const session = await this.rtcConnections.startSession()

    // session.startTransaction()

    const generatedRtcRoomId =
      this.utilityService.ensureObjectIdExists(rtcRoomId)

    try {
      await this.rtcConnections.findOneAndUpdate(
        { _id: generatedRtcRoomId },
        { $addToSet: { participants: { peerConnectionId } } },
        { new: true, upsert: true }
      )

      /**
       * In case of possible failures of the upsert flag
       */
      // if (!rtcConnection) {
      //   await this.rtcConnections.create(
      //     { _id: generatedRtcRoomId },
      //     { participants: [{ peerConnectionId }] }
      //   )
      // }
    } catch (error) {
      console.log(error)
      // await session.abortTransaction()
      throw new TransactionFailedException()
    }

    // await session.endSession()

    const rtcConnection = await this.rtcConnections.findById(rtcRoomId)

    if (!rtcConnection) {
      throw new NotFoundAfterTransactionException()
    }

    return this.utilityService.getObjectId(rtcConnection)
  }
}
