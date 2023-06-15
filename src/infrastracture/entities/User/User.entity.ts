import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../Base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;
  w;
  @Column()
  password: string;
}
