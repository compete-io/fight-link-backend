import { BaseEntity } from '../Base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CoordinatesEntity } from './coordinates.entity';
import { LocationEntity } from './location.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'address' })
export class AddressEntity extends BaseEntity {
  @AutoMap()
  @Column()
  street: string;

  @AutoMap()
  @Column()
  city: string;

  @AutoMap()
  @Column()
  postalCode: string;

  @AutoMap()
  @OneToOne(
    () => CoordinatesEntity,
    (coordinatesEntity) => coordinatesEntity.address,
    {
      eager: true,
      cascade: ['insert', 'update', 'remove'],
    },
  )
  @JoinColumn()
  coordinates: CoordinatesEntity;

  @OneToOne(() => LocationEntity, (locationEntity) => locationEntity.address, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  location: LocationEntity;
}
