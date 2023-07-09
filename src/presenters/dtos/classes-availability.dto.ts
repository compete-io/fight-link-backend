import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class ClassesAvailabilityDto {
  @AutoMap()
  @ApiProperty()
  individual: boolean;
  @AutoMap()
  @ApiProperty()
  kids: boolean;
  @AutoMap()
  @ApiProperty()
  morning: boolean;
}
