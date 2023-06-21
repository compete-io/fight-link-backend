import { ApiResponse } from '@nestjs/swagger';

export function mapApiResponses(
  responses: { status: number; description: string }[],
): Array<MethodDecorator> {
  return responses.map(({ status, description }) =>
    ApiResponse({ status, description }),
  );
}
