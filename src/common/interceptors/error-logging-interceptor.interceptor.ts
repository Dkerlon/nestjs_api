import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { catchError, throwError } from 'rxjs'

@Injectable()
export class ErrorLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP')

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error) => {
        this.logger.error(
          `Erro: ${error.message}`,
          error.stack,
          {
            status: error.response?.status,
            response: error.response?.data,
          },
        )

        return throwError(() => error)
      }),
    )
  }
}
