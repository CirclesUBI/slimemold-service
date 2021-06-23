import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'fastify-compress';
import { fastifyHelmet } from 'fastify-helmet';

import pkg from '../package.json';

import ConfigService from '~/modules/config/config.service';
import MainModule from '~/modules/main/main.module';

// Accept all IPv4 addresses when running the server.
// See: https://www.fastify.io/docs/latest/Getting-Started
const HOST_ADDRESS = '0.0.0.0';

function registerOpenAPI(app: NestFastifyApplication, path = '/') {
  const config = new DocumentBuilder()
    .setTitle(pkg.name)
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .setContact(pkg.name, pkg.homepage, null)
    .setLicense(pkg.license, pkg.homepage)
    .build();

  SwaggerModule.setup(path, app, SwaggerModule.createDocument(app, config));
}

async function initializeServer(): Promise<NestFastifyApplication> {
  // Create Fastify HTTP server instance
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter(),
  );

  // Validate all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
    }),
  );

  // Register middlewares
  app.register(compression);
  app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });

  return app;
}

async function startServer() {
  const app = await initializeServer();

  // Register public OpenAPI interface
  registerOpenAPI(app);

  // Start server
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'), HOST_ADDRESS);
}

startServer();
