import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth-controller';
import { TasksController } from './controllers/tasks-controller';

@Module({
  controllers: [AuthController, TasksController],
})
export class HttpModule {}
