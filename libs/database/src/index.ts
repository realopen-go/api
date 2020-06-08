import dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/entities';

dotenv.config();

const {
  TYPEORM_DATABASE: database,
  TYPEORM_HOST: host,
  TYPEORM_PASSWORD: password,
  TYPEORM_DEBUG: debug,
  TYPEORM_LOGGING: logging,
  TYPEORM_SYNCHRONIZE: synchronize,
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
  synchronize: JSON.parse(synchronize),
  logging: JSON.parse(logging),
  debug: JSON.parse(debug),
  autoLoadEntities: true,
  entities: [User],
};

export const createDatabase = (name = 'default') => {
  return TypeOrmModule.forRoot({
    ...config,
    name,
  });
};
