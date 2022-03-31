import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    namedb: process.env.POSTGRES_DB,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
  },
  apiKey: process.env.API_KEY,
  port: process.env.PORT,
}));
