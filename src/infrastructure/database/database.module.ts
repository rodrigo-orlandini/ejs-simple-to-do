import { Module } from '@nestjs/common';

import { EnvironmentModule } from 'src/infrastructure/environment/environment.module';

import { MongoService } from './mongo/mongo.service';
import { MongoUsersRepository } from './mongo/repositories/mongo-users-repository';
import { MongoTasksRepository } from './mongo/repositories/mongo-tasks-repository';

import { UsersRepository } from 'src/domain/repositories/users-repository';
import { TasksRepository } from 'src/domain/repositories/tasks-repository';

@Module({
  imports: [EnvironmentModule],
  providers: [
    MongoService,
    {
      provide: UsersRepository,
      useClass: MongoUsersRepository,
    },
    {
      provide: TasksRepository,
      useClass: MongoTasksRepository,
    },
  ],
  exports: [MongoService, UsersRepository, TasksRepository],
})
export class DatabaseModule {}
