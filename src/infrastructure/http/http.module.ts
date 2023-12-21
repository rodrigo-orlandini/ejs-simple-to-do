import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { AuthController } from './controllers/auth-controller';
import { TasksController } from './controllers/tasks-controller';

import { FetchUserTasksUseCase } from 'src/domain/usecases/fetch-user-tasks';

@Module({
  imports: [DatabaseModule],
  providers: [FetchUserTasksUseCase],
  controllers: [AuthController, TasksController],
})
export class HttpModule {}
