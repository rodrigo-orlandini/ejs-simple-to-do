import { Injectable } from '@nestjs/common';

import { UseCase } from 'src/core/usecase';

import { Task } from '../entities/task';

import { UsersRepository } from 'src/domain/repositories/users-repository';
import { TasksRepository } from 'src/domain/repositories/tasks-repository';

import { UserNotFoundError } from '../errors/user-not-found';
import { TaskAlreadyExistsError } from '../errors/task-already-exists';

interface CreateTaskUseCaseRequest {
  title: string;
  description: string;
  userId: string;
}

interface CreateTaskUseCaseResponse {
  task: Task;
}

@Injectable()
export class CreateTaskUseCase implements UseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tasksRepository: TasksRepository,
  ) {}

  public async execute({
    title,
    description,
    userId,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    const taskOnDatabase = await this.tasksRepository.findByTitle(title);

    if (taskOnDatabase) {
      throw new TaskAlreadyExistsError(title);
    }

    const task = Task.create({
      title,
      description,
      createdAt: new Date(),
      isCompleted: false,
      user,
    });

    await this.tasksRepository.create(task);

    return { task };
  }
}
