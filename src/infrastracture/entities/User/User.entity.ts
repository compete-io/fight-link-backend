import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../Base.entity';
import { SessionEntity } from '../Session/Session.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @OneToMany(() => SessionEntity, (sessionEntity) => sessionEntity.user, {
    eager: true,
    onUpdate: 'CASCADE',
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn()
  sessions: SessionEntity[];
}
