import { Injectable }             from '@nestjs/common'
import { MongooseModuleOptions }  from '@nestjs/mongoose'
import { MongooseOptionsFactory } from '@nestjs/mongoose'
import { EnvService }             from '@/env'

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly env: EnvService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      bufferCommands: false,
      uri: this.env.mongo.uri
    }
  }
}
