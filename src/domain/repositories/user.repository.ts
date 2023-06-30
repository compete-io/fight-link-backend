import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infrastracture/entities/User/User.entity';
import { CreateUserDto } from 'src/presenters/dtos/create-user.dto';

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

  async updateRefreshToken(
    userId: string,
    payload: { hashedRefreshToken: string },
  ): Promise<void> {
    await this.userRepository.update(userId, payload);
  }

  async logout(userId: string): Promise<boolean> {
    await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({ hashedRefreshToken: null })
      .where('id = :id', { id: userId })
      .andWhere('hashedRefreshToken IS NOT NULL')
      .execute();

    return true;
  }
}
