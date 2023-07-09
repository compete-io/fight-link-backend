import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class GymImagesDto {
  @AutoMap()
  @ApiProperty()
  logo: string;
  @AutoMap()
  @ApiProperty()
  background: string;
}
