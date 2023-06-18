import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from './address.dto';
import { CoordinatesDto } from './coordinates.dto';
import { AutoMap } from '@automapper/classes';

export class LocationDto {
  @AutoMap()
  @ApiProperty({ type: AddressDto })
  address: AddressDto;
  @AutoMap()
  @ApiProperty()
  isMain: boolean;
}
