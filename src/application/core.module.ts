import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserService } from 'src/domain/services/user.service';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastracture/entities/User/User.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';

import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [UserService, AuthService, UserRepository, AtStrategy, RtStrategy],
})
export class CoreModule {}
