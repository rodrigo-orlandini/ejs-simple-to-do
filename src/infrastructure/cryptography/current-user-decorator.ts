import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { z } from 'zod';

const authPayloadSchema = z.object({
  sub: z.string(),
});

export type AuthPayload = z.infer<typeof authPayloadSchema>;

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as AuthPayload;
  },
);
