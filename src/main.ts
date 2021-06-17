import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import compression from 'fastify-compress';
import { fastifyHelmet } from 'fastify-helmet';

import ServerModule from '~/server';

async function bootstrap() {
  // Create Fastify HTTP server instance
  const app = await NestFactory.create<NestFastifyApplication>(
    ServerModule,
    new FastifyAdapter(),
  );

  // Register middlewares
  app.register(compression);
  app.register(fastifyHelmet);

  // Start server
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port, '0.0.0.0');
}

bootstrap();
