import { AuthService } from './../services/auth.service';
import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { UserService } from 'src/domain/services/user.service';
import { UserEntity } from 'src/infrastracture/entities/User/User.entity';
import { CreateUserDto } from 'src/presenters/dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ApiResponses } from 'src/infrastracture/utils/swagger/swagger.decorators';
import { JoiValidationPipe } from 'src/infrastracture/utils/pipes/joivalidation.pipe';
import { createUserSchema } from 'src/infrastracture/schemas/create-user.schema';

@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiResponses('User registration', [
    { status: HttpStatus.CREATED, description: 'User created!' },
    { status: HttpStatus.CONFLICT, description: 'User exists' },
    { status: HttpStatus.BAD_REQUEST, description: 'Bad request' },
    { status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' },
  ])
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async create(@Body() payload: CreateUserDto): Promise<UserEntity> {
    return this.authService.register(payload);
  }

  @Post('/login')
  @ApiResponses('User Login', [
    { status: HttpStatus.ACCEPTED, description: 'User Logged In!' },
    { status: HttpStatus.BAD_REQUEST, description: 'Bad request' },
    { status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' },
  ])
  async login(@Body() payload: CreateUserDto): Promise<UserEntity> {
    return this.authService.login(payload);
  }
}
