import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../Base.entity';
import { UserEntity } from '../User/User.entity';

@Entity('session')
export class SessionEntity extends BaseEntity {
  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column()
  expirationDate: string;

  @Column({ default: false })
  invalidate: boolean;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.sessions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;
}
