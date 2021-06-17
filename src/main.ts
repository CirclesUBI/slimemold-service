import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import ServerModule from './server';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port);
}

bootstrap();
