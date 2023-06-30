import { AuthService } from '../services/auth.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserEntity } from 'src/infrastracture/entities/User/User.entity';
import { CreateUserDto } from 'src/presenters/dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponses } from 'src/infrastracture/utils/swagger/swagger.decorators';
import { JoiValidationPipe } from 'src/infrastracture/utils/pipes/joivalidation.pipe';
import { createUserSchema } from 'src/infrastracture/schemas/create-user.schema';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../../domain/services/user.service';
import { Request } from 'express';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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
  async login(@Body() payload: CreateUserDto): Promise<Tokens> {
    return this.authService.login(payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  async logout(@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user['sub']);
  }

  @Get('/users')
  getUsers(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
