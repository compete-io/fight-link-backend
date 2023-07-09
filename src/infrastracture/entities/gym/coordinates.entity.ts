import { BaseEntity } from '../Base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { AddressEntity } from './address.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'coordinates' })
export class CoordinatesEntity extends BaseEntity {
  @AutoMap()
  @Column('float')
  lat: number;

  @AutoMap()
  @Column('float')
  lng: number;

  @OneToOne(() => AddressEntity, (addressEntity) => addressEntity.coordinates, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  address: AddressEntity;
}
