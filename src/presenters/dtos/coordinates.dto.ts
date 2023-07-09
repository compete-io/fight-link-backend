import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';
import { AutoMap } from '@automapper/classes';

export class CoordinatesDto {
  @AutoMap()
  @ApiProperty()
  lat: number;
  @AutoMap()
  @ApiProperty()
  lng: number;
}
