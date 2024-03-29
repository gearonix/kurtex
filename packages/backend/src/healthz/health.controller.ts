import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckError,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  MongooseHealthIndicator
} from '@nestjs/terminus'
import { EnvService } from '@/env'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private mongooseHealth: MongooseHealthIndicator,
    private env: EnvService
  ) {}

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com')
    ])
  }

  @Get('mongo')
  @HealthCheck()
  checkMongo() {
    return this.health.check([() => this.mongooseHealth.pingCheck('mongoDB')])
  }

  @Get('client')
  @HealthCheck()
  checkClient() {
    if (!this.env.client.url) {
      throw new HealthCheckError(
        'CLIENT_URL is not provided in environment variables.',
        {}
      )
    }

    return this.health.check([
      () => this.http.pingCheck('client', this.env.client.url)
    ])
  }
}
