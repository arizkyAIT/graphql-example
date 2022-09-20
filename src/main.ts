import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bodyParser: true,
  });

  const logger = new Logger('Main');
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  app.listen(configService.get('APP_PORT') || 3000, () => {
    logger.log(`Running on ${configService.get('APP_PORT') || 3000}`, 'NestApplication');
  });
}
bootstrap();
