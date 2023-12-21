import { Injectable } from '@nestjs/common';

import { UseCase } from 'src/core/usecase';

import { Task } from '../entities/task';

import { UsersRepository } from 'src/domain/repositories/users-repository';
import { TasksRepository } from 'src/domain/repositories/tasks-repository';

import { UserNotFoundError } from '../errors/user-not-found';
import { TaskNotFoundError } from '../errors/task-not-found';

interface CompleteTaskUseCaseRequest {
  userId: string;
  taskId: string;
}

interface CompleteTaskUseCaseResponse {
  task: Task;
}

@Injectable()
export class CompleteTaskUseCase implements UseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tasksRepository: TasksRepository,
  ) {}

  public async execute({
    userId,
    taskId,
  }: CompleteTaskUseCaseRequest): Promise<CompleteTaskUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new TaskNotFoundError(taskId);
    }

    if (task.user.id != user.id) {
      throw new TaskNotFoundError(taskId);
    }

    task.isCompleted = true;

    await this.tasksRepository.update(task);

    return { task };
  }
}
