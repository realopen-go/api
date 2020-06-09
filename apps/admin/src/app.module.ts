import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { createDatabase } from '@app/database';
import { AuthModule, BillsModule, UsersModule } from '@app/modules';

import { AuthController } from './controllers/auth/auth.controller';
import { BillsController } from './controllers/bills/bills.controller';
import { MainController } from './controllers/main.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    createDatabase(),
    AuthModule,
    BillsModule,
    UsersModule,
  ],
  controllers: [AuthController, BillsController, MainController],
})
export class AppModule {}
