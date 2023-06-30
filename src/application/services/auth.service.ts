import { IAuth } from '../interfaces/auth.interface';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/domain/services/user.service';
import { UserEntity } from 'src/infrastracture/entities/User/User.entity';
import { CreateUserDto } from 'src/presenters/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstant } from '../../infrastracture/utils/constants';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService implements IAuth {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
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

  async logout(userId: string): Promise<boolean> {
    const user = await this.userService.findUserById(userId);
    console.log(user);
    if (user && user.hashedRefreshToken !== null) {
      console.log(user.id);
      await this.userService.logout(user.id);
      return true;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(payload: CreateUserDto): Promise<Tokens> {
    try {
      const user = await this.validateUser(payload);
      const tokens = await this.getTokens(user);
      await this.userService.updateRefreshTokenHash(
        user.id,
        tokens.refreshToken,
      );
      return tokens;
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async getTokens(payload: UserEntity): Promise<Tokens> {
    const jwtPayload = {
      sub: payload.id,
      email: payload.email,
    };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtConstant.secret,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: 'rt-secret',
        expiresIn: '7d',
      }),
    ]);
    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
