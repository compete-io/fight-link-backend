import { Controller, Get } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { UserEntity } from '../../infrastracture/entities/User/User.entity';

//TODO add auth guard
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
