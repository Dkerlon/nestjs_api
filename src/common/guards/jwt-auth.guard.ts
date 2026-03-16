import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { RequestContextService } from '../services/request-context.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly RequestContextService: RequestContextService) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAutheticated = (await super.canActivate(context)) as boolean

    if(isAutheticated){
      const request = context.switchToHttp().getRequest()
      this.RequestContextService.setUser(request.user)
    }

    return isAutheticated
  }
}
