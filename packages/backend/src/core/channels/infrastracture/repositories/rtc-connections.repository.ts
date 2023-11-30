import { Model }                             from 'mongoose'
import { RtcConnection }                     from '@core/channels/domain/entities'
import { InjectModel }                       from '@nestjs/mongoose'
import { NotFoundAfterTransactionException } from '@core/channels/shared/exceptions'
import { TransactionFailedException }        from '@core/channels/shared/exceptions'
import { Injectable }                        from '@nestjs/common'
import { DatabaseUtilityService }            from '@/database'

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
    rtcRoomId?: string
  ) {
    const session = await this.rtcConnections.startSession()

    session.startTransaction()

    const generatedRtcRoomId =
      this.utilityService.ensureObjectIdExists(rtcRoomId)

    try {
      await session.withTransaction(async () => {
        await this.rtcConnections.findOneAndUpdate(
          { _id: generatedRtcRoomId },
          { $addToSet: { participants: { peerConnectionId } } },
          { new: true, session, upsert: true }
        )

        /**
         * In case of possible failures of the upsert flag
         */
        if (!rtcConnection) {
          await this.rtcConnections.create(
            { _id: generatedRtcRoomId },
            { participants: [{ peerConnectionId }] },
            { session }
          )
        }
      })
    } catch (error) {
      await session.abortTransaction()
      throw new TransactionFailedException()
    }

    await session.endSession()

    const rtcConnection = await this.rtcConnections.findById(rtcRoomId)

    if (!rtcConnection) {
      throw new NotFoundAfterTransactionException()
    }

    return this.utilityService.getObjectId(rtcConnection)
  }
}
