import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../Base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { GymEntity } from './gym.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'classesAvailability' })
export class ClassesAvailabilityEntity extends BaseEntity {
  @AutoMap()
  @Column()
  individual: boolean;
  @AutoMap()
  @Column()
  kids: boolean;
  @AutoMap()
  @Column()
  morning: boolean;
  @AutoMap()
  @OneToOne(() => GymEntity, (gymEntity) => gymEntity.classesAvailability, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  gym: GymEntity;
}
