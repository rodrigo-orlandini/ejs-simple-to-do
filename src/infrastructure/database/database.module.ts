import { Module } from '@nestjs/common';
import { EnvironmentModule } from '../environment/environment.module';
import { MongoService } from './mongo/mongo.service';

@Module({
  imports: [EnvironmentModule],
  providers: [MongoService],
  exports: [MongoService],
})
export class DatabaseModule {}
