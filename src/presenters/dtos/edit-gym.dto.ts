import { ApiProperty } from '@nestjs/swagger';
import { ContactDto } from './contact.dto';
import { LocationDto } from './location.dto';
import { Discipline } from '../../domain/enums/discipline';
import { ClassesAvailabilityDto } from './classes-availability.dto';
import { GymImagesDto } from './gym-images.dto';

export class EditGymDto {
  @ApiProperty({
    description: 'Name of the gym',
  })
  name?: string;
  @ApiProperty({
    description: 'Description of the gym',
  })
  description: string;
  @ApiProperty({
    description:
      "Founding date timestamp with timezone yyyy-MM-dd'T'HH:mm:ss.SSS'Z', time can be ignored and set to 00:00:00.000",
    example: '2023-06-21T20:24:13.565Z',
  })
  foundingDate?: Date;
  @ApiProperty({ type: ClassesAvailabilityDto })
  classesAvailability?: ClassesAvailabilityDto;
  @ApiProperty({ type: GymImagesDto })
  images?: GymImagesDto;
  @ApiProperty({ enum: Discipline, enumName: 'Discipline', isArray: true })
  disciplines?: Discipline[];
  @ApiProperty({ type: [LocationDto] })
  locations?: LocationDto[];
  @ApiProperty({ type: ContactDto })
  contact?: ContactDto;
}
