import { SocialMediaDto } from './social-media.dto';
import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';
import { AutoMap } from '@automapper/classes';

export class ContactDto {
  @AutoMap()
  @ApiProperty()
  email: string;
  @AutoMap()
  @ApiProperty()
  phoneNumber: string;
  @AutoMap()
  @ApiProperty({ type: SocialMediaDto, nullable: true })
  socials: SocialMediaDto;
}
