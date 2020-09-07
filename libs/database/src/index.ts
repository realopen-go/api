import dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/entities';

dotenv.config();

const {
  TYPEORM_DATABASE: database,
  TYPEORM_HOST: host,
  TYPEORM_PASSWORD: password,
  TYPEORM_TIMEZONE: timezone = '+00:00',
  TYPEORM_USERNAME: username,
} = process.env;

const config = {
  name: 'default',
  type: 'mysql' as 'mysql',
  host,
  port: 3306,
  username,
  password,
  database,
  timezone,
  synchronize: false,
  logging: false,
  debug: false,
  autoLoadEntities: true,
  entities: [User],
};

export const createDatabase = (name = 'default') => {
  return TypeOrmModule.forRoot({
    ...config,
    name,
  });
};
