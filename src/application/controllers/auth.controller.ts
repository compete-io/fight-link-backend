import { AuthService } from './../services/auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/domain/services/user.service';
import { UserEntity } from 'src/infrastracture/entities/User/User.entity';
import { CreateUserDto } from 'src/presenters/dtos/create-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  async create(@Body() payload: CreateUserDto): Promise<UserEntity> {
    return this.authService.register(payload);
  }

  @Post('/login')
  async login(@Body() payload: CreateUserDto): Promise<UserEntity> {
    return this.authService.login(payload);
  }

  @Get('/users')
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
