import { BadRequestException, Controller, Get, Render } from '@nestjs/common';

import { FetchUserTasksUseCase } from 'src/domain/usecases/fetch-user-tasks';

import { UserNotFoundError } from 'src/domain/errors/user-not-found';

import {
  AuthPayload,
  CurrentUser,
} from 'src/infrastructure/cryptography/current-user-decorator';

@Controller('/tasks')
export class TasksController {
  constructor(private fetchUserTasks: FetchUserTasksUseCase) {}

  @Get()
  @Render('tasks')
  async root(@CurrentUser() auth: AuthPayload) {
    try {
      const { tasks } = await this.fetchUserTasks.execute({
        userId: auth.sub.id,
      });

      return {
        username: auth.sub.username,
        countTasks: tasks.length,
        countCompletedTasks: tasks.filter((task) => task.isCompleted).length,
        tasks,
      };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new BadRequestException(error.message);
      }

      console.error(error);
      throw new BadRequestException('Some error occurred.');
    }
  }
}
