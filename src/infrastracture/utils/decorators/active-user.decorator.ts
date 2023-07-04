import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserData } from '../types/active-user.type';

export const USER_KEY = 'user';
export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserData | undefined = request[USER_KEY];
    return field ? user?.[field] : user;
  },
);
