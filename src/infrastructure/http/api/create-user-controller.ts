import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';

import { CreateUserUseCase } from 'src/domain/usecases/create-user';

import { ZodValidationPipe } from 'src/infrastructure/http/pipe/zod-validation-pipe';

import { UserAlreadyExistsError } from 'src/domain/errors/user-already-exists';

const createUserBodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller('/users')
export class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async handle(@Body() body: CreateUserBodySchema) {
    const { username, password } = body;

    try {
      const { user } = await this.createUser.execute({
        username,
        password,
      });

      return { user };
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        throw new BadRequestException(error.message);
      }

      console.error(error);
      throw new BadRequestException('Some error occurred.');
    }
  }
}
