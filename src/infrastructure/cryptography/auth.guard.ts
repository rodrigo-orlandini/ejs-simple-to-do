import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { EnvironmentService } from '../environment/environment.service';

import { IS_PUBLIC_KEY } from './public';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwt: JwtService,
    private environment: EnvironmentService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('Start');
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('public?');
    if (isPublic) {
      return true;
    }
    console.log('bearer?');

    const request = context.switchToHttp().getRequest();
    let token = this.extractTokenFromHeader(request);
    console.log('cookie?');

    if (!token) {
      token = this.extractTokenFromCookie(request);
    }
    console.log('ready?');

    if (!token) {
      throw new UnauthorizedException();
    }
    console.log('Payload');

    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: this.environment.get('JWT_SECRET'),
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const token: string | undefined =
      request.cookies['@simpletodo:access-token'];

    return token;
  }
}
