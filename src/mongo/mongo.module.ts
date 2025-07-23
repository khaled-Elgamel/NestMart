import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => ({
        uri: ConfigService.get<string>('MONGO_URI'),
      }),
    }),
  ],
})
export class MongoModule {}
