import { Injectable } from '@nestjs/common';
import { GymEntity } from '../../infrastracture/entities/gym/gym.entity';
import { GymDto } from '../../presenters/dtos/GymDto';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { ClassesAvailabilityEntity } from '../../infrastracture/entities/gym/classes-availability.entity';
import { ContactEntity } from '../../infrastracture/entities/gym/contact.entity';
import { LocationEntity } from '../../infrastracture/entities/gym/location.entity';
import { AddressEntity } from '../../infrastracture/entities/gym/address.entity';
import { CoordinatesEntity } from '../../infrastracture/entities/gym/coordinates.entity';
import { SocialMediaEntity } from '../../infrastracture/entities/gym/social-media.dto';
import { SocialMediaDto } from '../../presenters/dtos/social-media.dto';
import { ClassesAvailabilityDto } from '../../presenters/dtos/classes-availability.dto';
import { CoordinatesDto } from '../../presenters/dtos/coordinates.dto';
import { LocationDto } from '../../presenters/dtos/location.dto';
import { AddressDto } from '../../presenters/dtos/address.dto';
import { ContactDto } from '../../presenters/dtos/contact.dto';

@Injectable()
export class GymMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, GymEntity, GymDto); //Read
      createMap(mapper, ClassesAvailabilityEntity, ClassesAvailabilityDto); //Read
      createMap(mapper, ContactEntity, ContactDto); //Read
      createMap(mapper, SocialMediaEntity, SocialMediaDto); //Read
      createMap(mapper, LocationEntity, LocationDto); //Read
      createMap(mapper, AddressEntity, AddressDto); //Read
      createMap(mapper, CoordinatesEntity, CoordinatesDto); //Read
    };
  }
}
