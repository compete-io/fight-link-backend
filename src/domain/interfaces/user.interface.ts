import { UserEntity } from 'src/infrastracture/entities/User/User.entity';

export interface IUserService {
  create(userDto: UserEntity): Promise<UserEntity>;
  findUserById(userId: string): Promise<UserEntity>;
  findUserByEmail(email: string): Promise<UserEntity>;
  comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
}
