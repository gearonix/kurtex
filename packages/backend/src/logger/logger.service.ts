import { Injectable } from '@nestjs/common'

@Injectable()
export class LoggerService {
  scopes: string[] = []

  private prefix(
    options: { message?: string | null; markdown?: boolean } = {}
  ) {
    const { message, markdown } = options
    const scopes = `[${this.scopes.join(' > ')}]`
    if (scopes === '[]') return options.message ?? ''
    const prefix = markdown ? scopes.replace(/\[/g, '\\[') : scopes
    return [prefix, message].filter(Boolean).join(' ')
  }

  public child(scope?: string | null) {
    if (!scope) return this
    const child = new LoggerService()
    child.scopes = this.scopes.concat(scope)
    return child
  }

  public info(message: string) {
    this.debug(message)
  }

  public alert(message: string) {
    this.debug(message)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public debug(...messages: any[]) {
    const prefix = this.prefix()
    if (prefix) console.log(prefix, ...messages)
    else console.log(...messages)
  }
}
