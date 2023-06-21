import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

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

  private buildErrorMessage(error: Joi.ValidationError): string {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(', ');
    return errorMessage;
  }
}
