import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/modules/users/dto/user.dto';

export const CurrentUser = createParamDecorator((field: keyof User | undefined, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const user = ctx.getContext().req.user;
  return field ? user?.[field] : user;
});
