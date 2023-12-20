import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { EnvironmentModule } from './environment/environment.module';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';

import { environmentSchema } from './environment/environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => environmentSchema.parse(env),
      isGlobal: true,
    }),
    EnvironmentModule,
    DatabaseModule,
    HttpModule,
  ],
})
export class AppModule {}
