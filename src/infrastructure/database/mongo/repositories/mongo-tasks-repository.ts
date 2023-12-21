import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Task } from 'src/domain/entities/task';
import { TasksRepository } from 'src/domain/repositories/tasks-repository';

import { MongoService } from '../mongo.service';
import { TASK_MODEL_NAME, TASK_MODEL_SCHEMA } from '../schemas/task-schema';

@Injectable()
export class MongoTasksRepository implements TasksRepository {
  private taskModel: Model<any>;

  constructor(mongo: MongoService) {
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

  public async findByTitle(title: string): Promise<Task | null> {
    const task = await this.taskModel.findOne({ title }).exec();

    if (!task) {
      return null;
    }

    return task;
  }
}
