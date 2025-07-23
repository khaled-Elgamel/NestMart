import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MongoModule } from './mongo/mongo.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import * as morgan from 'morgan';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
    }),
    UsersModule,
    ProductModule,
    MongoModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: (authGuard: AuthGuard) => authGuard,
      inject: [AuthGuard],
    },
    {
      // provide: APP_GUARD,
      // useFactory: (rolesGuard: RolesGuard) => rolesGuard,
      // inject: [RolesGuard],

      provide: APP_GUARD,
      useClass: RolesGuard, // ✅ safe to use this here
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(morgan('dev')) // or 'combined', 'tiny', or custom format
      .forRoutes('*'); // apply to all routes
  }
}
