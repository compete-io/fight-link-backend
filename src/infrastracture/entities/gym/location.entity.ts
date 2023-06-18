import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { GymEntity } from './gym.entity';
import { BaseEntity } from '../base.entity';
import { AddressEntity } from './address.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'location' })
export class LocationEntity extends BaseEntity {
  @AutoMap()
  @OneToOne(() => AddressEntity, (addressEntity) => addressEntity.location, {
    eager: true,
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn()
  address: AddressEntity;

  @AutoMap()
  @Column()
  isMain: boolean;

  @ManyToOne((type) => GymEntity, (gymEntity) => gymEntity.locations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  gym: GymEntity;
}
