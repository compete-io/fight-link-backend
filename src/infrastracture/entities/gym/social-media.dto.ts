import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { ContactEntity } from './contact.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'socialMedia' })
export class SocialMediaEntity extends BaseEntity {
  @AutoMap()
  @Column()
  website: string;
  @AutoMap()
  @Column()
  facebook: string;
  @AutoMap()
  @Column()
  instagram: string;
  @AutoMap()
  @Column()
  tikTok: string;
  @OneToOne(() => ContactEntity, (contactEntity) => contactEntity.socials, {
    eager: true,
    cascade: ['insert', 'update', 'remove'],
  })
  contact: ContactEntity;
}
