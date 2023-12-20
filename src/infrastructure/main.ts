import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { EnvironmentService } from './environment/environment.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const environment = app.get(EnvironmentService);
  const port = environment.get('PORT');

  await app.listen(port);
}

bootstrap();
