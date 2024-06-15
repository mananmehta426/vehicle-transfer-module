import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ExceptionsLoggerFilter } from './exceptionsLogger.filter';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3002', // Replace with the allowed origin(s)
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
  });

  const configService = app.get(ConfigService);
  app.useGlobalFilters(new ExceptionsLoggerFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  
  await app.listen(configService.get<number>('PORT') || 3001);
}
bootstrap();
