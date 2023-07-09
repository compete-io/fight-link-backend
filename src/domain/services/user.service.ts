import { Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/user.interface';
import { UserEntity } from 'src/infrastracture/entities/User/User.entity';
import { CreateUserDto } from 'src/presenters/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  async create(payload: CreateUserDto): Promise<UserEntity> {
    const hashedPassword: string = await bcrypt.hash(payload.password, 10);
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
    return bcrypt.compare(password, hashedPassword);
  }
}
