import { Controller, Get, Render } from '@nestjs/common';

import {
  AuthPayload,
  CurrentUser,
} from 'src/infrastructure/cryptography/current-user-decorator';

@Controller('/tasks')
export class TasksController {
  @Get()
  @Render('tasks')
  root(@CurrentUser() auth: AuthPayload) {
    return {
      username: auth.sub.username,
      countTasks: 0,
      countCompletedTasks: 0,
    };
  }
}
