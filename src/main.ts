import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { WrapDataInterceptor } from './common/interceptors/wrap-data/wrap-data.interceptor';
import { CustomExceptionFilter } from './common/filters/custom-exception/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new WrapDataInterceptor());
  app.useGlobalFilters(new CustomExceptionFilter());
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);
}

bootstrap();
