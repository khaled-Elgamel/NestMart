import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { User } from 'src/users/user.schema';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(), // refers to the current route handler (e.g., findAll()).
    );
    if (isPublic) {
      return true;
    }

    const req: Request = context.switchToHttp().getRequest();

    // 1- check if the token exist , if exists get
    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      throw new ForbiddenException(
        'You are not logged in! Please log in to get access.',
      );
    }

    // 2. Verify token
    const decoded: any = this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    // 3. Check if user exists
    const user = await this.userModel.findById(decoded.id);
    if (!user) {
      throw new UnauthorizedException(
        'The user belonging to this token no longer exists.',
      );
    }

    req['user'] = user;
    return true;
  }
}
