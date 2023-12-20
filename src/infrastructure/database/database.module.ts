import { Module } from '@nestjs/common';

import { EnvironmentModule } from 'src/infrastructure/environment/environment.module';

import { MongoService } from './mongo/mongo.service';
import { MongoUsersRepository } from './mongo/repositories/mongo-users-repository';

import { UsersRepository } from 'src/domain/repositories/users-repository';

@Module({
  imports: [EnvironmentModule],
  providers: [
    MongoService,
    {
      provide: UsersRepository,
      useClass: MongoUsersRepository,
    },
  ],
  exports: [MongoService, UsersRepository],
})
export class DatabaseModule {}
