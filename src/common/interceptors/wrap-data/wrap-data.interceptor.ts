import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class WrapDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data || (Array.isArray(data) && data.length === 0)) {
          return {
            message: 'No data found',
            data: null,
          };
        }
        return {
          status: 'success',
          timestamp: new Date().toISOString(),
          data,
        };
      }),
    );
  }
}
