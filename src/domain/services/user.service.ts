import { Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/user.interface';
import { UserEntity } from 'src/infrastracture/entities/User/User.entity';
import { CreateUserDto } from 'src/presenters/dtos/create-user.dto';
import * as argon2 from 'argon2';
import { UserRepository } from '../repositories/user.repository';
import { SessionEntity } from '../../infrastracture/entities/Session/Session.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  async create(payload: CreateUserDto): Promise<UserEntity> {
    const hashedPassword: string = await argon2.hash(payload.password);
    const newUser = this.userRepository.create({
      ...payload,
      password: hashedPassword,
    });
    return newUser;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async findUserById(userId: string): Promise<UserEntity | null> {
    const user = this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = this.userRepository.findByEmail(email);
    if (!email) throw new Error('Email is required');
    return user;
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return argon2.verify(hashedPassword, password);
  }

  async updateSession(id: string, session: SessionEntity): Promise<void> {
    await this.userRepository.updateSession(id, session);
  }
}
