import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { ContactEntity } from './contact.entity';
import { LocationEntity } from './location.entity';
import { Discipline } from '../../../domain/enums/discipline';
import { GymStatus } from '../../../domain/enums/gym-status';
import { GymImagesDto } from '../../../presenters/dtos/gym-images.dto';
import { ClassesAvailabilityEntity } from './classes-availability.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'gym' })
export class GymEntity extends BaseEntity {
  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  description: string;

  @AutoMap()
  @Column({ type: 'timestamptz' })
  foundingDate: Date;

  @AutoMap()
  @Column('json')
  images: GymImagesDto;

  @AutoMap()
  @OneToOne(() => ContactEntity, (contactEntity) => contactEntity.gym, {
    eager: true,
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn()
  contact: ContactEntity;

  @AutoMap()
  @OneToOne(
    () => ClassesAvailabilityEntity,
    (classesAvailability) => classesAvailability.gym,
    {
      eager: true,
      cascade: ['insert', 'update', 'remove'],
    },
  )
  @JoinColumn()
  classesAvailability: ClassesAvailabilityEntity;

  @AutoMap(() => [LocationEntity])
  @OneToMany(() => LocationEntity, (locationEntity) => locationEntity.gym, {
    eager: true,
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn()
  locations: LocationEntity[];

  //TODO replace 'json' when creating relations
  @AutoMap(() => [String])
  @Column('json')
  disciplines: Discipline[];

  @AutoMap()
  @Column()
  status: GymStatus;
}
