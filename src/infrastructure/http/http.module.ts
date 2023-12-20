import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

import { SignUpPageController } from './controllers/sign-up-page-controller';

import { CreateUserController } from './controllers/create-user-controller';

import { CreateUserUseCase } from 'src/domain/usecases/create-user';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUserController, SignUpPageController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
