import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { GymsService } from '../../domain/services/gyms.service';
import { CreateGymDto } from '../../presenters/dtos/create-gym.dto';
import { ApiResponses } from '../../infrastracture/utils/swagger/swagger.decorators';
import { GymDto } from '../../presenters/dtos/GymDto';
import { JoiValidationPipe } from '../../infrastracture/utils/pipes/joivalidation.pipe';
import { createGymSchema } from '../../infrastracture/schemas/create-gym.schema';
import { ErrorDto } from '../../presenters/dtos/error.dto';
import { ApiResponse } from '@nestjs/swagger';

//TODO add auth guard
@Controller('/gyms')
export class GymController {
  constructor(private readonly gymsService: GymsService) {}

  @Post()
  @ApiResponses('User registration', [
    { status: HttpStatus.CREATED, description: 'Gym created.' },
    { status: HttpStatus.CONFLICT, description: 'Gym already exists' },
    { status: HttpStatus.BAD_REQUEST, description: 'Bad request' },
    { status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' },
  ])
  @UsePipes(new JoiValidationPipe(createGymSchema))
  async create(@Body() dto: CreateGymDto): Promise<GymDto> {
    return this.gymsService.create(dto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: GymDto,
    description: 'Gyms list has been loaded properly.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorDto,
    description: 'Requires authorization.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    type: ErrorDto,
    description:
      'User has no permission to delete a gym - NO_PERMISSION\nGym can not be deleted under PROCESSING status.',
  })
  async getGyms(): Promise<GymDto[]> {
    return this.gymsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: GymDto,
    description: 'Gym has been loaded properly.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorDto,
    description: 'Requires authorization.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    type: ErrorDto,
    description:
      'User has no permission to delete a gym - NO_PERMISSION\nGym can not be deleted under PROCESSING status.',
  })
  async getGym(@Param('id') id: string): Promise<GymDto> {
    return this.gymsService.findGymById(id);
  }

  // @Patch(':id')
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   type: GymDto,
  //   description: 'Gym has been edited.',
  // })
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST,
  //   type: ErrorDto,
  //   description: 'Requires authorization.',
  // })
  // @ApiResponse({
  //   status: HttpStatus.FORBIDDEN,
  //   type: ErrorDto,
  //   description:
  //     'User has no permission to edit a gym - NO_PERMISSION\nGym can not be edited under PROCESSING status.',
  // })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   type: ErrorDto,
  //   description: 'Internal server error.',
  // })
  // async editGym(
  //   @Param('id') id: string,
  //   @Body(new JoiValidationPipe(EditGymDto.validateSchema))
  //   editGymDto: EditGymDto,
  // ): Promise<GymEntity> {
  //   return this.gymsService.editGym(id, editGymDto);
  // }
}
