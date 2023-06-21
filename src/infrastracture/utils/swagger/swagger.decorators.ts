import { ApiOperation } from '@nestjs/swagger';
import { mapApiResponses } from './swagger.utils';

export function ApiResponses(
  nameOfOperation: string,
  responses: { status: number; description: string }[],
): MethodDecorator & ClassDecorator {
  const decorators = mapApiResponses(responses);
  return function (
    target: Record<string, any>,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>,
  ) {
    decorators.forEach((decorator) => decorator(target, key, descriptor));

    if (nameOfOperation) {
      ApiOperation({ summary: nameOfOperation })(target, key, descriptor);
    }
  };
}
