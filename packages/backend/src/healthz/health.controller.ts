import { Controller }          from '@nestjs/common'
import { Get }                 from '@nestjs/common'
import { HealthCheckService }  from '@nestjs/terminus'
import { HttpHealthIndicator } from '@nestjs/terminus'
import { HealthCheck }         from '@nestjs/terminus'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  /**
   * @temporarily
   */
  check() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com')
    ])
  }
}
