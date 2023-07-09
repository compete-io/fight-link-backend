import { CreateGymDto } from '../../presenters/dtos/create-gym.dto';
import { GymDto } from '../../presenters/dtos/GymDto';

export interface IGymsService {
  create(dto: CreateGymDto): Promise<GymDto>;

  findAll(): Promise<GymDto[]>;

  findGymById(gymId: string): Promise<GymDto>;
}
