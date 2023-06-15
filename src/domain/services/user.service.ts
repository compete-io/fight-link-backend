import { Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastracture/entities/User/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/presenters/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(payload: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const newUser = this.userRepository.create({
      ...payload,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(userId: string): Promise<UserEntity | null> {
    const user = this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = this.userRepository.findOne({ where: { email } });
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
