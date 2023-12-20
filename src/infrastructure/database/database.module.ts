import { Module } from '@nestjs/common';
import { EnvironmentModule } from 'src/infrastructure/environment/environment.module';
import { MongoService } from './mongo/mongo.service';

@Module({
  imports: [EnvironmentModule],
  providers: [MongoService],
  exports: [MongoService],
})
export class DatabaseModule {}
