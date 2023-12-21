import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

import { CreateUserController } from './api/create-user-controller';
import { AuthenticateController } from './api/authenticate-controller';

import { CreateUserUseCase } from 'src/domain/usecases/create-user';
import { AuthenticateUseCase } from 'src/domain/usecases/authenticate';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUserController, AuthenticateController],
  providers: [CreateUserUseCase, AuthenticateUseCase],
})
export class ApiModule {}
