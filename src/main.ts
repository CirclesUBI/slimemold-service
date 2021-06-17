import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'fastify-compress';
import { fastifyHelmet } from 'fastify-helmet';

import pkg from '../package.json';
import ServerModule from '~/server';

async function bootstrap() {
  // Create Fastify HTTP server instance
  const app = await NestFactory.create<NestFastifyApplication>(
    ServerModule,
    new FastifyAdapter(),
  );

  // Validate all incoming requests
  app.useGlobalPipes(new ValidationPipe());

  // Register middlewares
  app.register(compression);
  app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });

  // Setup OpenAPI endpoint
  const config = new DocumentBuilder()
    .setTitle(pkg.name)
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .setContact(pkg.name, pkg.homepage, null)
    .setLicense(pkg.license, pkg.homepage)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  // Start server
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port, '0.0.0.0');
}

bootstrap();
