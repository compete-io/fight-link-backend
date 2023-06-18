import { ApiProperty } from '@nestjs/swagger';
import { GymImagesDto } from './gym-images.dto';
import { ContactDto } from './contact.dto';
import { ClassesAvailabilityDto } from './classes-availability.dto';
import { LocationDto } from './location.dto';
import { Discipline } from '../../domain/enums/discipline';
import { GymStatus } from '../../domain/enums/gym-status';
import { AutoMap } from '@automapper/classes';

export class GymDto {
  @AutoMap()
  @ApiProperty()
  id: string;
  @AutoMap()
  @ApiProperty()
  name: string;
  @AutoMap()
  @ApiProperty()
  description: string;
  @AutoMap()
  foundingDate: Date;
  @AutoMap()
  images: GymImagesDto;
  @AutoMap()
  contact: ContactDto;
  @AutoMap()
  classesAvailability: ClassesAvailabilityDto;
  @AutoMap(() => [LocationDto])
  locations: LocationDto[];
  @AutoMap(() => [String])
  @ApiProperty()
  disciplines: Discipline[];
  @AutoMap()
  @ApiProperty()
  status: GymStatus;
}
