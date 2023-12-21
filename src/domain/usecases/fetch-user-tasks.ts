import { Injectable } from '@nestjs/common';

import { UseCase } from 'src/core/usecase';

import { Task } from '../entities/task';

import { UsersRepository } from 'src/domain/repositories/users-repository';
import { TasksRepository } from 'src/domain/repositories/tasks-repository';

import { UserNotFoundError } from '../errors/user-not-found';

interface FetchUserTasksUseCaseRequest {
  userId: string;
}

interface FetchUserTasksUseCaseResponse {
  tasks: Task[];
}

@Injectable()
export class FetchUserTasksUseCase implements UseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tasksRepository: TasksRepository,
  ) {}

  public async execute({
    userId,
  }: FetchUserTasksUseCaseRequest): Promise<FetchUserTasksUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    const tasks = await this.tasksRepository.findManyByUserId(userId);

    if (!tasks) {
      return { tasks: [] };
    }

    return { tasks };
  }
}
