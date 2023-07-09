import { Column, Entity, OneToOne } from 'typeorm';
import { GymEntity } from './gym.entity';
import { BaseEntity } from '../base.entity';
import { SocialMediaDto } from '../../../presenters/dtos/social-media.dto';
import { SocialMediaEntity } from './social-media.dto';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'contact' })
export class ContactEntity extends BaseEntity {
  @AutoMap()
  @Column()
  email: string;

  @AutoMap()
  @Column()
  phoneNumber: string;

  @AutoMap()
  @OneToOne(
    () => SocialMediaEntity,
    (socialMediaEntity) => socialMediaEntity.contact,
    {
      cascade: ['insert', 'update'],
      nullable: true,
    },
  )
  socials: SocialMediaEntity;

  @OneToOne(() => GymEntity, (gymEntity) => gymEntity.contact, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  gym: GymEntity;
}
