import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserService } from '../domain/services/user.service';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../infrastracture/entities/User/User.entity';
import { UserRepository } from '../domain/repositories/user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { SessionService } from '../domain/services/session.service';
import { SessionEntity } from '../infrastracture/entities/Session/Session.entity';
import { UuidGenerator } from '../infrastracture/utils/generators/uuid.generator';
import jwtConfig from '../infrastracture/config/jwt/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenGuard } from './guards/at.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SessionEntity]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    JwtService,
    SessionService,
    UserRepository,
    UuidGenerator,
    AccessTokenGuard,
  ],
})
export class CoreModule {}
