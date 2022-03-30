import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import config from './config';
import { environment } from './enviroments';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environment[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: joi.object({
        API_KEY: joi.number().required(),
        DATABASE_NAME: joi.string().required(),
        DATABASE_PORT: joi.number().required(),
        PORT: joi.number().required(),
      }),
    }),
    ProductsModule,
    UsersModule,
    DatabaseModule,
  ],
})
export class AppModule {}
