import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;
  @ApiProperty({
    example: 'Password123!',
    description:
      'User password - 1 big letter, 1 special character, min 8 characters',
  })
  password: string;
}
