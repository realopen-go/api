import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { createDatabase } from '@app/database';
import { AuthModule, UsersModule } from '@app/modules';

import { AuthController } from './controllers/auth/auth.controller';
import { MainController } from './controllers/main.controller';

@Module({
  imports: [ConfigModule.forRoot(), createDatabase(), AuthModule, UsersModule],
  controllers: [AuthController, MainController],
})
export class AppModule {}
