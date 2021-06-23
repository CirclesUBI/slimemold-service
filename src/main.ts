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

import MainModule from '~/modules/main/main.module';

async function startServer() {
  // Create Fastify HTTP server instance
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter(),
  );

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
  SwaggerModule.setup('/', app, SwaggerModule.createDocument(app, config));

  // Start server
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port, '0.0.0.0');
}

startServer();
