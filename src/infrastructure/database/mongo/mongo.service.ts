import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Mongoose } from 'mongoose';

import { EnvironmentService } from 'src/infrastructure/environment/environment.service';

@Injectable()
export class MongoService
  extends Mongoose
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private environment: EnvironmentService) {
    super();
  }

  async onModuleInit() {
    await this.connect(this.environment.get('DATABASE_URL'));
  }

  async onModuleDestroy() {
    await this.disconnect();
  }
}
