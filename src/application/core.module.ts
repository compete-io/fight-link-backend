import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserService } from 'src/domain/services/user.service';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastracture/entities/User/User.entity';
import { UserController } from './controllers/user.controller';
import { GymsService } from '../domain/services/gyms.service';
import { GymController } from './controllers/gym.controller';
import { GymEntity } from '../infrastracture/entities/gym/gym.entity';
import { ContactEntity } from '../infrastracture/entities/gym/contact.entity';
import { AddressEntity } from '../infrastracture/entities/gym/address.entity';
import { LocationEntity } from '../infrastracture/entities/gym/location.entity';
import { CoordinatesEntity } from '../infrastracture/entities/gym/coordinates.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { SocialMediaEntity } from '../infrastracture/entities/gym/social-media.dto';
import { ClassesAvailabilityEntity } from '../infrastracture/entities/gym/classes-availability.entity';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { GymMapperProfile } from '../domain/mappers/gym-mapper-profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      GymEntity,
      ContactEntity,
      AddressEntity,
      LocationEntity,
      CoordinatesEntity,
      SocialMediaEntity,
      ClassesAvailabilityEntity,
    ]),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [AuthController, UserController, GymController],
  providers: [
    UserService,
    AuthService,
    GymsService,
    UserRepository,
    GymMapperProfile,
  ],
})
export class CoreModule {}
