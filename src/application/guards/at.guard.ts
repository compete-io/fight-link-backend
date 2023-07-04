import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../../infrastracture/config/jwt/jwt.config';
import { ConfigType } from '@nestjs/config';
import { SessionService } from '../../domain/services/session.service';
import { USER_KEY } from '../../infrastracture/utils/decorators/active-user.decorator';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly sessionService: SessionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      const session = await this.sessionService.getByAccessToken(token);
      if (!session || session.invalidate) {
        throw new UnauthorizedException();
      }
      request[USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers['authorization']?.split(' ') ?? [];
    return token;
  }
}
