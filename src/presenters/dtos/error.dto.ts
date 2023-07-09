import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({ description: 'Standard HTTP status name' })
  status: string;
  @ApiProperty({ description: 'Standard HTTP status code' })
  code: number;
  @ApiProperty({
    description:
      'Map of the errors and front-end displayable messages. Key in the map should be related to the component in the front-end. If it exists, error field should be always null.',
  })
  errors?: Map<string, string>;

  constructor(status: string, code: number, errors: Map<string, string>) {
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}
