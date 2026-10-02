import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Module, Controller, Get } from '@nestjs/common';
import { analyticsConfig } from '@wsc/config';

@Controller()
class HealthController {
  @Get('health')
  health() {
    return { service: 'wsc-analytics', status: 'ok', port: analyticsConfig.port };
  }
}

@Module({ controllers: [HealthController] })
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  await app.listen(analyticsConfig.port, '0.0.0.0');
}

bootstrap();
