import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';

import { AuthenticateUseCase } from 'src/domain/usecases/authenticate';

import { ZodValidationPipe } from 'src/infrastructure/http/pipe/zod-validation-pipe';

import { InvalidCredentialsError } from 'src/domain/errors/invalid-credentials';

const authenticateBodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/users')
export class AuthenticateController {
  constructor(private authenticate: AuthenticateUseCase) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { username, password } = body;

    try {
      const { accessToken } = await this.authenticate.execute({
        username,
        password,
      });

      return { accessToken };
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw new BadRequestException(error.message);
      }

      console.error(error);
      throw new BadRequestException('Some error occurred.');
    }
  }
}
