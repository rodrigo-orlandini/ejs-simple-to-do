import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';

import { CreateTaskUseCase } from 'src/domain/usecases/create-task';

import { ZodValidationPipe } from 'src/infrastructure/http/pipe/zod-validation-pipe';
import {
  AuthPayload,
  CurrentUser,
} from 'src/infrastructure/cryptography/current-user-decorator';

import { TaskAlreadyExistsError } from 'src/domain/errors/task-already-exists';
import { UserNotFoundError } from 'src/domain/errors/user-not-found';

const createTaskBodySchema = z.object({
  title: z.string(),
  description: z.string(),
});

type CreateTaskBodySchema = z.infer<typeof createTaskBodySchema>;

@Controller('/api/tasks')
export class CreateTaskController {
  constructor(private createTask: CreateTaskUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createTaskBodySchema))
  async handle(
    @CurrentUser() auth: AuthPayload,
    @Body() body: CreateTaskBodySchema,
  ) {
    const { title, description } = body;

    try {
      const { task } = await this.createTask.execute({
        title,
        description,
        userId: auth.sub.id,
      });

      return { task };
    } catch (error) {
      if (
        error instanceof TaskAlreadyExistsError ||
        error instanceof UserNotFoundError
      ) {
        throw new BadRequestException(error.message);
      }

      console.error(error);
      throw new BadRequestException('Some error occurred.');
    }
  }
}
