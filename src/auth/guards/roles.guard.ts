import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEYS } from '../../common/decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLE_KEYS, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true; // No roles required → allow
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !roles.includes(user.role)) {
      throw new ForbiddenException('You do not have permission');
    }
    return true;
  }
}
