import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config';
const API_KEY = 'hola desde global';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { namedb, port, user, password, host } = configService.database;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: namedb,
          synchronize: true,
          autoLoadEntities: true, // 👈 new attr
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { namedb, port, user, password, host } = configService.database;
        const client = new Client({
          user,
          host,
          database: namedb,
          password,
          port,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
