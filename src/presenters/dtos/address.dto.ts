import { ApiProperty } from '@nestjs/swagger';
import { CoordinatesDto } from './coordinates.dto';
import Joi from 'joi';
import { AutoMap } from '@automapper/classes';

export class AddressDto {
  @AutoMap()
  @ApiProperty()
  street: string;
  @AutoMap()
  @ApiProperty()
  city: string;
  @AutoMap()
  @ApiProperty()
  postalCode: string;
  @AutoMap()
  @ApiProperty({ type: CoordinatesDto })
  coordinates: CoordinatesDto;
}
