import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGymsService } from '../interfaces/gyms.interface';
import { GymEntity } from '../../infrastracture/entities/gym/gym.entity';
import { CreateGymDto } from '../../presenters/dtos/create-gym.dto';
import { GymStatus } from '../enums/gym-status';
import { GymDto } from '../../presenters/dtos/GymDto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class GymsService implements IGymsService {
  constructor(
    @InjectRepository(GymEntity)
    private readonly gymsRepository: Repository<GymEntity>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(dto: CreateGymDto): Promise<GymDto> {
    const newGym = this.gymsRepository.create({
      status: GymStatus.PROCESSING,
      ...dto,
    });
    await this.gymsRepository.save(newGym);
    return this.mapper.map(newGym, GymEntity, GymDto);
  }

  async findAll(): Promise<GymDto[]> {
    const gyms = await this.gymsRepository.find();
    if (!gyms) {
      return [];
    }
    return this.mapper.mapArrayAsync(gyms, GymEntity, GymDto);
  }

  async findGymById(gymId: string): Promise<GymDto> {
    const gym = await this.gymsRepository.findOne({ where: { id: gymId } });
    if (!gym) throw new Error('Gym not found');
    return this.mapper.map(gym, GymEntity, GymDto);
  }
}
