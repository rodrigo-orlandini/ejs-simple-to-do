import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

import { CreateUserController } from './api/create-user-controller';
import { AuthenticateController } from './api/authenticate-controller';
import { CreateTaskController } from './api/create-task-controller';

import { CreateUserUseCase } from 'src/domain/usecases/create-user';
import { AuthenticateUseCase } from 'src/domain/usecases/authenticate';
import { CreateTaskUseCase } from 'src/domain/usecases/create-task';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUserController,
    AuthenticateController,
    CreateTaskController,
  ],
  providers: [CreateUserUseCase, AuthenticateUseCase, CreateTaskUseCase],
})
export class ApiModule {}
