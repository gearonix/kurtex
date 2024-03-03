import { HttpStatus, InternalServerErrorException } from '@nestjs/common'

export class NotFoundAfterTransactionException extends InternalServerErrorException {
  constructor(entity?: string) {
    const message = `Unexpected error: Document ${entity} not found after transaction.`

    super(message)

    this.name = 'NotFoundAfterTransactionException'
  }

  public getStatus(): number {
    return HttpStatus.INTERNAL_SERVER_ERROR
  }
}
