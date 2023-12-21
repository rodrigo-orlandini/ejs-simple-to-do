import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

import { AuthPageController } from './controllers/auth-page-controller';

import { CreateUserController } from './controllers/create-user-controller';

import { CreateUserUseCase } from 'src/domain/usecases/create-user';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUserController, AuthPageController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
