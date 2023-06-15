import { IAuth } from '../interfaces/auth.interface';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from 'src/domain/services/user.service';
import { UserEntity } from 'src/infrastracture/entities/User/User.entity';
import { CreateUserDto } from 'src/presenters/dtos/create-user.dto';

@Injectable()
export class AuthService implements IAuth {
  constructor(private readonly userService: UserService) {}

  async register(payload: CreateUserDto): Promise<UserEntity> {
    try {
      const newUser = await this.userService.create(payload);
      return newUser;
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

  async login(payload: CreateUserDto): Promise<UserEntity> {
    try {
      const user = await this.userService.findUserByEmail(payload.email);
      if (!user) {
        throw new ConflictException('User does not exist');
      } else {
        return user;
      }
    } catch (err) {
      if (err.status === 409) {
        throw new ConflictException('User does not exist');
      }
      throw new Error(err);
    }
  }
}
