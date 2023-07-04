import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infrastracture/entities/User/User.entity';
import { CreateUserDto } from 'src/presenters/dtos/create-user.dto';
import { SessionEntity } from '../../infrastracture/entities/Session/Session.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(newUser: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findById(userId: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new Error('User not found');
    return user;
  }

  async updateSession(id: string, session: SessionEntity): Promise<UserEntity> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundException('User not found');
    }
    existing.sessions = [...existing.sessions, session];
    return this.userRepository.save(existing);
  }
}
