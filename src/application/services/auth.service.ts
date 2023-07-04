import { IAuth } from '../interfaces/auth.interface';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/domain/services/user.service';
import { UserEntity } from 'src/infrastracture/entities/User/User.entity';
import { CreateUserDto } from 'src/presenters/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';

import { SessionEntity } from '../../infrastracture/entities/Session/Session.entity';
import { SessionService } from '../../domain/services/session.service';
import { UuidGenerator } from '../../infrastracture/utils/generators/uuid.generator';
import { ActiveUserData } from '../../infrastracture/utils/types/active-user.type';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../../infrastracture/config/jwt/jwt.config';
import { RefreshTokenDto } from '../../presenters/dtos/refreshToken.dto';

@Injectable()
export class AuthService implements IAuth {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
    private readonly uuidGenerator: UuidGenerator,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async validateUser({ email, password }: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.findUserByEmail(email);

    if (!user)
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    const isPasswordMatching = await this.userService.comparePasswords(
      password,
      user.password,
    );

    if (isPasswordMatching) return user;
    else
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async register(payload: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.userService.create(payload);
    } catch (err) {
      if (err.code === '23505') {
        const message = err.detail.replace(
          /^Key \((.*)\)=\((.*)\) (.*)/,
          'The $1 $2 already exists.',
        );
        throw new ConflictException(message);
      } else {
        throw new Error(err);
      }
    }
  }

  async logout(payload: ActiveUserData) {
    console.log(payload);
    try {
      const session = await this.sessionService.getByUserId(payload.sub);
      if (!session) {
        throw new NotFoundException('Session does not exist');
      }
      return this.sessionService.invalidateForUser(payload.sub);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async login(payload: CreateUserDto) {
    try {
      const user = await this.validateUser(payload);
      if (!user) throw new UnauthorizedException('gowno');
      await this.sessionService.invalidateForUser(user.id);
      return this.getTokens(user);
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, sessionId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & { sessionId: string }
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      const user = await this.userService.findUserById(sub);
      const isValid = await this.sessionService.validate(user.id, sessionId);
      if (isValid) {
        await this.sessionService.invalidate(sessionId);
      } else {
        throw new Error('Refresh token is invalid');
      }
      return this.getTokens(user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async getTokens(payload: UserEntity): Promise<SessionEntity> {
    const sessionId = this.uuidGenerator.generate();
    const expirationDate = new Date(
      new Date().getTime() + this.jwtConfiguration.accessTokenTtl * 1000,
    ).toISOString();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        payload.id,
        this.jwtConfiguration.accessTokenTtl,
        {
          email: payload.email,
        },
      ),
      this.signToken(payload.id, this.jwtConfiguration.refreshTokenTtl, {
        sessionId,
      }),
    ]);

    const session = new SessionEntity();
    Object.assign(session, {
      id: sessionId,
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: payload,
      invalidate: false,
      expirationDate: expirationDate,
    });

    await this.sessionService.insert(session);
    await this.userService.updateSession(payload.id, session);
    return this.sessionService.getByAccessToken(accessToken);
  }

  async getAllSessions(): Promise<SessionEntity[]> {
    return await this.sessionService.getAll();
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}
