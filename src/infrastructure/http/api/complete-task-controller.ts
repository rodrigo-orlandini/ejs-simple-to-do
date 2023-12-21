import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common';

import { CompleteTaskUseCase } from 'src/domain/usecases/complete-task';

import {
  AuthPayload,
  CurrentUser,
} from 'src/infrastructure/cryptography/current-user-decorator';

import { UserNotFoundError } from 'src/domain/errors/user-not-found';
import { TaskNotFoundError } from 'src/domain/errors/task-not-found';

@Controller('/api/tasks/:id')
export class CompleteTaskController {
  constructor(private completeTask: CompleteTaskUseCase) {}

  @Patch()
  @HttpCode(200)
  async handle(@CurrentUser() auth: AuthPayload, @Param('id') taskId: string) {
    try {
      const { task } = await this.completeTask.execute({
        userId: auth.sub.id,
        taskId,
      });

      return { task };
    } catch (error) {
      if (
        error instanceof TaskNotFoundError ||
        error instanceof UserNotFoundError
      ) {
        throw new BadRequestException(error.message);
      }

      console.error(error);
      throw new BadRequestException('Some error occurred.');
    }
  }
}
