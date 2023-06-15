import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserService } from 'src/domain/services/user.service';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastracture/entities/User/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [UserService, AuthService],
})
export class CoreModule {}
