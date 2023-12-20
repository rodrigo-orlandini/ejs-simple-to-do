import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { EnvironmentService } from './environment/environment.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, 'http', 'public'));
  app.setBaseViewsDir(join(__dirname, 'http', 'views'));
  app.setViewEngine('ejs');

  const environment = app.get(EnvironmentService);
  const port = environment.get('PORT');

  await app.listen(port);
}

bootstrap();
