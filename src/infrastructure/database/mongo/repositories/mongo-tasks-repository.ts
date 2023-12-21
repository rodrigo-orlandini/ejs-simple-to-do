import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Task } from 'src/domain/entities/task';
import { TasksRepository } from 'src/domain/repositories/tasks-repository';

import { MongoService } from '../mongo.service';
import { MongoTaskMapper } from '../mappers/mongo-task-mapper';
import { TASK_MODEL_NAME, TASK_MODEL_SCHEMA } from '../schemas/task-schema';

import { UsersRepository } from 'src/domain/repositories/users-repository';

@Injectable()
export class MongoTasksRepository implements TasksRepository {
  private taskModel: Model<any>;

  constructor(
    mongo: MongoService,
    private usersRepository: UsersRepository,
  ) {
    this.taskModel = mongo.model(TASK_MODEL_NAME, TASK_MODEL_SCHEMA);
  }

  public async create(task: Task): Promise<Task> {
    await this.taskModel.create({
      _id: task.id,
      title: task.title,
      description: task.description,
      isCompleted: task.isCompleted,
      createdAt: task.createdAt,
      userId: task.user.id,
    });

    return task;
  }

  public async update(task: Task): Promise<Task> {
    await this.taskModel.updateOne(
      {
        _id: task.id,
      },
      {
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
        createdAt: task.createdAt,
        userId: task.user.id,
      },
    );

    return task;
  }

  public async findById(id: string): Promise<Task | null> {
    const task = await this.taskModel.findOne({ _id: id }).exec();

    if (!task) {
      return null;
    }

    const user = await this.usersRepository.findById(task.userId);

    if (!user) {
      throw Error('User not found in task.');
    }

    return MongoTaskMapper.toDomain(task, user);
  }

  public async findByTitle(title: string): Promise<Task | null> {
    const task = await this.taskModel.findOne({ title }).exec();

    if (!task) {
      return null;
    }

    return task;
  }

  public async findManyByUserId(userId: string): Promise<Task[] | null> {
    const tasks = await this.taskModel.find({ userId }).exec();

    if (!tasks || tasks.length === 0) {
      return null;
    }

    return tasks;
  }
}
