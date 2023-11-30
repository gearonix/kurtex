import { HttpStatus }                   from '@nestjs/common'
import { InternalServerErrorException } from '@nestjs/common'

export class TransactionFailedException extends InternalServerErrorException {
  constructor() {
    super('Unexpected error: Transaction failed.')

    this.name = 'TransactionFailedException'
  }

  public getStatus(): number {
    return HttpStatus.INTERNAL_SERVER_ERROR
  }
}
