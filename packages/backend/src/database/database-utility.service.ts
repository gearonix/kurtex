import { Injectable } from '@nestjs/common'
import { mongo }      from 'mongoose'
import { Types }      from 'mongoose'
import { Nullable }   from '@grnx-utils/types'

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
