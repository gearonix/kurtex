import { Nullable } from '@kurtex/std'
import { Injectable } from '@nestjs/common'
import { mongo, Types } from 'mongoose'

@Injectable()
export class DatabaseUtilityService {
  public ensureObjectIdExists(existingId?: Nullable<string>) {
    return existingId ?? this.generateObjectId()
  }

  public generateObjectId() {
    const objectId = new mongo.ObjectId()

    return objectId.toHexString()
  }

  public getObjectId<T extends { _id: Types.ObjectId }>(schema: T) {
    return schema._id.toHexString()
  }
}
