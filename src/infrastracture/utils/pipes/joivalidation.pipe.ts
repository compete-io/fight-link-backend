import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as Joi from 'joi';
import { ErrorDto } from '../../../presenters/dtos/error.dto';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}

  transform(value: any) {
    const { error, value: validatedValue } = this.schema.validate(value, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const errorMessage = this.buildErrorMessage(error);
      throw new BadRequestException(errorMessage);
    }
    return validatedValue;
  }

  private buildErrorMessage(error: Joi.ValidationError): ErrorDto {
    const errors = new Map();
    error.details.forEach((errorDetails) => {
      errors[errorDetails.context.label] = errorDetails.message;
    });
    return new ErrorDto('BadRequest', 404, errors);
  }
}
